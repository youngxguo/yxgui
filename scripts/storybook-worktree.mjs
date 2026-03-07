import { createHash } from 'node:crypto';
import { spawn } from 'node:child_process';
import net from 'node:net';

const PORT_MIN = 6100;
const PORT_MAX = 6999;
const PORT_RANGE = PORT_MAX - PORT_MIN + 1;
const cliArgs = process.argv.slice(2);

function parsePort(value) {
  if (!value) {
    return null;
  }

  const parsed = Number.parseInt(value, 10);
  if (!Number.isInteger(parsed) || parsed < 1 || parsed > 65535) {
    return null;
  }

  return parsed;
}

function hasExplicitPortArg(args) {
  return args.some(
    (arg, index) =>
      arg === '--port' ||
      arg === '-p' ||
      arg.startsWith('--port=') ||
      (index > 0 && args[index - 1] === '--port') ||
      (index > 0 && args[index - 1] === '-p')
  );
}

function getDeterministicWorktreePort() {
  const hash = createHash('sha1').update(process.cwd()).digest();
  const offset = hash.readUInt16BE(0) % PORT_RANGE;
  return PORT_MIN + offset;
}

function isPortAvailable(port) {
  return new Promise((resolve) => {
    const server = net.createServer();

    server.once('error', () => resolve(false));
    server.once('listening', () => {
      server.close(() => resolve(true));
    });

    server.listen(port, '127.0.0.1');
  });
}

async function resolvePort() {
  const envPort = parsePort(process.env.STORYBOOK_PORT);
  if (envPort) {
    return envPort;
  }

  const seedPort = getDeterministicWorktreePort();
  for (let step = 0; step < PORT_RANGE; step += 1) {
    const port = PORT_MIN + ((seedPort - PORT_MIN + step) % PORT_RANGE);
    // Keep auto-assigned ports in a predictable, Storybook-only range.
    if (await isPortAvailable(port)) {
      return port;
    }
  }

  throw new Error(`Could not find an available port between ${PORT_MIN} and ${PORT_MAX}.`);
}

async function run() {
  const command = process.platform === 'win32' ? 'storybook.cmd' : 'storybook';
  const hasExplicitPort = hasExplicitPortArg(cliArgs);
  const port = hasExplicitPort ? null : await resolvePort();
  const storybookArgs = hasExplicitPort
    ? ['dev', ...cliArgs]
    : ['dev', '-p', String(port), ...cliArgs];

  if (!hasExplicitPort) {
    // Keep the selected port visible so parallel worktree runs are easy to track.
    process.stdout.write(`[storybook] ${process.cwd()} -> http://localhost:${port}\n`);
  }

  const child = spawn(command, storybookArgs, {
    stdio: 'inherit',
    env: process.env
  });

  child.on('error', (error) => {
    process.stderr.write(`[storybook] failed to start: ${error.message}\n`);
    process.exit(1);
  });

  child.on('exit', (code, signal) => {
    if (signal) {
      process.kill(process.pid, signal);
      return;
    }

    process.exit(code ?? 1);
  });
}

await run();
