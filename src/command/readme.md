# Command

A lightweight TypeScript wrapper for executing shell commands with flexible output
handling.

## Installation

```ts
import { Command } from "@ph/command";
```

## Features

- Simple and intuitive command execution interface
- Support for both piped and inherited output modes
- Flexible argument handling
- Error handling with detailed error messages
- Command string dumping for debugging
- Zero dependencies (built on Deno.Command)

## Usage

### Example

```ts
import { Command } from "@ph/command";

const ls = new Command("ls", "-la");

const output = await ls.pipe();
const echo = new Command("echo", output);
await echo.inherit();
```

## License

MIT
