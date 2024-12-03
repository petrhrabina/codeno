# Printer

A TypeScript library for styled console output with a fluent builder interface.

## Installation

```ts
import { type Callable, type ColorType, type Method, PrinterBuilder } from "@ph/printer";
```

## Features

- Fluent builder interface for printer configuration
- RGB foreground and background colors support
- Text styling (bold, underline)
- Custom separators for multiple text segments
- Custom output methods support
- Type-safe interface

## Usage

### Basic Example

```ts
import { type Callable, type ColorType, type Method, PrinterBuilder } from "@ph/printer";

// Simple printer
const printer = PrinterBuilder.create().build();
printer("Hello", "World"); // Outputs: Hello, World

// Styled printer
const styledPrinter = PrinterBuilder.create()
    .bold
    .underline
    .foreground({ r: 255, g: 193, b: 37 })
    .separator(" -> ")
    .build();

styledPrinter("Step 1", "Step 2", "Step 3"); // Outputs: Step 1 -> Step 2 -> Step 3 (in gold, bold, underlined)
```

### Advanced Usage

```ts
import { type ColorType, type Method, PrinterBuilder } from "@ph/printer";

// Custom output method
const errorPrinter = PrinterBuilder.create()
    .method((text: string) => console.error(`[ERROR] ${text}`))
    .foreground({ r: 255, g: 0, b: 0 })
    .build();

errorPrinter("Operation failed"); // Outputs in red: [ERROR] Operation failed

// Combining multiple styles
const highlightPrinter = PrinterBuilder.create()
    .bold
    .foreground({ r: 0, g: 255, b: 0 })
    .background({ r: 0, g: 0, b: 0 })
    .separator(" | ")
    .build();

highlightPrinter("Success", "Done"); // Outputs: Success | Done (in green on black, bold)
```

## License

MIT
