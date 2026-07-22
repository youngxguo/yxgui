# yxgui plan

yxgui is a small, opinionated React component system with accessible behavior and
a coherent visual language. It ships as a compiled package, with StyleX kept
as its public styling contract and built-in light and dark theme objects.

## Approach

- Build tokens and components from real interface needs instead of designing a
  large system up front.
- Keep fixed values, semantic variables, and themes as distinct StyleX layers.
- Prefer native HTML behavior and add complexity only when accessibility or user
  experience requires it.
- Maintain a focused public API and avoid alternate styling systems,
  compatibility layers, and component scaffolding without a concrete need.

## Roadmap

### Foundation

Maintain the compiled package, StyleX token layers, static CSS output, and
consumer integration.

### Core interface

Build a representative settings interface to establish the visual language,
essential controls, component conventions, and accessibility expectations.

### Expand from use

Add feedback, compound interactions, and advanced components only as applications
require them. Stabilize documentation and release policy as the public API grows.
