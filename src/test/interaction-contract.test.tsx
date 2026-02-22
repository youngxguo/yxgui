import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Button } from '../components/Button/Button';
import { Checkbox } from '../components/Checkbox/Checkbox';
import { Dialog, DialogContent, DialogTrigger } from '../components/Dialog/Dialog';
import { Switch } from '../components/Switch/Switch';
import {
  expectDisabledElementSkippedByTab,
  expectEscapeDismissesAndRestoresFocus,
  expectKeyboardActivation,
  expectReceivesTabFocus
} from './interactionContract';

describe('keyboard and focus interaction contracts', () => {
  it('covers baseline keyboard activation and disabled behavior for Button', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    const onDisabledClick = vi.fn();

    render(
      <>
        <Button onClick={onClick}>Primary action</Button>
        <button type="button">Sentinel start</button>
        <Button disabled onClick={onDisabledClick}>
          Disabled action
        </Button>
        <button type="button">Sentinel end</button>
      </>
    );

    const button = screen.getByRole('button', { name: 'Primary action' });
    const sentinelStart = screen.getByRole('button', { name: 'Sentinel start' });
    const disabledButton = screen.getByRole('button', { name: 'Disabled action' });
    const sentinelEnd = screen.getByRole('button', { name: 'Sentinel end' });

    await expectReceivesTabFocus(user, button);
    await expectKeyboardActivation({
      user,
      element: button,
      key: '{Enter}',
      expectCalls: () => expect(onClick).toHaveBeenCalledTimes(1)
    });
    await expectKeyboardActivation({
      user,
      element: button,
      key: '[Space]',
      expectCalls: () => expect(onClick).toHaveBeenCalledTimes(2)
    });

    await user.click(disabledButton);
    expect(onDisabledClick).not.toHaveBeenCalled();

    await expectDisabledElementSkippedByTab({
      user,
      firstFocusable: sentinelStart,
      disabledElement: disabledButton,
      nextFocusable: sentinelEnd
    });
  });

  it('covers checkbox keyboard toggle, tab focus, and disabled behavior', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const onDisabledChange = vi.fn();

    render(
      <>
        <Checkbox aria-label="Email updates" onChange={onChange} />
        <button type="button">Sentinel start</button>
        <Checkbox aria-label="Disabled updates" disabled onChange={onDisabledChange} />
        <button type="button">Sentinel end</button>
      </>
    );

    const checkbox = screen.getByRole('checkbox', { name: 'Email updates' });
    const sentinelStart = screen.getByRole('button', { name: 'Sentinel start' });
    const disabledCheckbox = screen.getByRole('checkbox', { name: 'Disabled updates' });
    const sentinelEnd = screen.getByRole('button', { name: 'Sentinel end' });

    await expectReceivesTabFocus(user, checkbox);
    await expectKeyboardActivation({
      user,
      element: checkbox,
      key: '[Space]',
      expectCalls: () => {
        expect(checkbox).toBeChecked();
        expect(onChange).toHaveBeenCalledTimes(1);
      }
    });

    await user.click(disabledCheckbox);
    expect(onDisabledChange).not.toHaveBeenCalled();

    await expectDisabledElementSkippedByTab({
      user,
      firstFocusable: sentinelStart,
      disabledElement: disabledCheckbox,
      nextFocusable: sentinelEnd
    });
  });

  it('covers switch keyboard activation, tab focus, and disabled behavior', async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    const onDisabledCheckedChange = vi.fn();

    render(
      <>
        <Switch aria-label="Auto save" onCheckedChange={onCheckedChange} />
        <button type="button">Sentinel start</button>
        <Switch
          aria-label="Disabled auto save"
          disabled
          onCheckedChange={onDisabledCheckedChange}
        />
        <button type="button">Sentinel end</button>
      </>
    );

    const switchControl = screen.getByRole('switch', { name: 'Auto save' });
    const sentinelStart = screen.getByRole('button', { name: 'Sentinel start' });
    const disabledSwitch = screen.getByRole('switch', { name: 'Disabled auto save' });
    const sentinelEnd = screen.getByRole('button', { name: 'Sentinel end' });

    await expectReceivesTabFocus(user, switchControl);
    await expectKeyboardActivation({
      user,
      element: switchControl,
      key: '{Enter}',
      expectCalls: () => expect(onCheckedChange).toHaveBeenCalledTimes(1)
    });
    await expectKeyboardActivation({
      user,
      element: switchControl,
      key: '[Space]',
      expectCalls: () => expect(onCheckedChange).toHaveBeenCalledTimes(2)
    });

    await user.click(disabledSwitch);
    expect(onDisabledCheckedChange).not.toHaveBeenCalled();

    await expectDisabledElementSkippedByTab({
      user,
      firstFocusable: sentinelStart,
      disabledElement: disabledSwitch,
      nextFocusable: sentinelEnd
    });
  });

  it('provides a reusable overlay contract for escape dismiss and focus restore', async () => {
    const user = userEvent.setup();

    render(
      <Dialog>
        <DialogTrigger>Open dialog</DialogTrigger>
        <DialogContent>
          <input aria-label="Recipient" />
        </DialogContent>
      </Dialog>
    );

    const trigger = screen.getByRole('button', { name: 'Open dialog' });

    await expectEscapeDismissesAndRestoresFocus({
      user,
      trigger,
      open: async () => {
        await user.click(trigger);
      },
      getLayer: () => screen.queryByRole('dialog')
    });
  });
});
