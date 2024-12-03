# Assert

A TypeScript assertion library for testing and defensive programming with clear, expressive API.

## Installation

```ts
import { Assert } from "@ph4/assert";
```

## Features

- Simple and intuitive assertion methods
- Support for primitive and array comparisons
- Regular expression pattern matching
- Clear error messages
- Built on top of Deno's standard assert module
- Type-safe interface

## Usage

### Basic Assertions

```ts
import { Assert } from "@ph4/assert";

// Boolean assertions
Assert.true(5 > 0);
Assert.false(10 < 5);

// Value equality
Assert.same(42, 42);
Assert.sameArray([1, 2, 3], [1, 2, 3]);
```

### Regular Expression Assertions

```ts
import { Assert } from "@ph4/assert";

// Pattern matching
Assert.matchRegexp(/\d+/, "123");       // Passes
Assert.notMatchRegexp(/\d+/, "abc");    // Passes

// Complex patterns
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
Assert.matchRegexp(emailPattern, "user@example.com");    // Passes
Assert.notMatchRegexp(emailPattern, "invalid-email");    // Passes
```

### Defensive Programming

```ts
import { Assert } from "@ph4/assert";

function divide(a: number, b: number): number {
    Assert.true(b !== 0, "Division by zero");
    return a / b;
}

function processArray(arr: unknown[]): void {
    Assert.sameArray(arr, [1, 2, 3], "Invalid array format");
    // Process array...
}
```

## API

### Assert Class

```ts
class Assert {
    static true(value: boolean): void;
    static false(value: boolean): void;
    static same(expected: unknown, actual: unknown): void;
    static sameArray(expected: unknown[], actual: unknown[]): void;
    static matchRegexp(pattern: RegExp, testcase: string): void;
    static notMatchRegexp(pattern: RegExp, testcase: string): void;
}
```

### Error Handling

All assertion methods throw `AssertionError` when the condition is not met:

```ts
try {
    Assert.true(false);
} catch (error) {
    console.error(error); // AssertionError
}
```

## License

MIT 
