# Assert

A TypeScript assertion library for testing and defensive programming with clear,
expressive API.

## Installation

```ts
import { Assert } from "@ph/assert";
```

## Features

- Simple and intuitive assertion methods
- Support for primitive and array comparisons
- Regular expression pattern matching
- Clear error messages
- Built on top of Deno's standard assert module
- Type-safe interface

## Usage

### Basic Example

```ts
import { Assert } from "@ph/assert";

// Boolean assertions
Assert.true(5 > 0);
Assert.false(10 < 5);

// Value equality
Assert.same(42, 42);
Assert.sameArray([1, 2, 3], [1, 2, 3]);
```

### Advanced Usage

```ts
import { Assert } from "@ph/assert";

// Pattern matching
Assert.matchRegexp(/\d+/, "123"); // Passes
Assert.notMatchRegexp(/\d+/, "abc"); // Passes

// Complex patterns
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
Assert.matchRegexp(emailPattern, "user@example.com"); // Passes
Assert.notMatchRegexp(emailPattern, "invalid-email"); // Passes

// Defensive programming
function divide(a: number, b: number): number {
    Assert.true(b !== 0);
    return a / b;
}

function processArray(arr: unknown[]): void {
    Assert.sameArray([1, 2, 3], arr);
    // Process array...
}
```

## License

MIT
