# RegExp Builder

A TypeScript library for building regular expressions with a fluent interface and predefined patterns.

## Installation

```ts
import { Builder, Preset, Quantifiers } from "@ph4/regexp";
```

## Features

- Fluent builder interface for regular expressions
- Rich set of predefined patterns and character classes
- Support for named capturing groups
- Flexible quantifier system
- Type-safe API
- Comprehensive preset patterns

## Usage

### Basic Example

```ts
import { Builder, Preset } from "@ph4/regexp";

// Simple pattern matching
const digitPattern = Builder.of(Preset.digit).build();
console.log(digitPattern.test("5")); // true
console.log(digitPattern.test("a")); // false

// Multiple patterns with OR
const alphaPattern = Builder.of(Preset.latinLower, Preset.latinUpper).build();
console.log(alphaPattern.test("a")); // true
console.log(alphaPattern.test("Z")); // true
```

### Advanced Usage

```ts
import { Builder, Preset, Quantifiers } from "@ph4/regexp";

// Named capturing groups
const datePattern = Builder.of(
    Preset.capture("year", "\\d{4}"),
    "-",
    Preset.capture("month", "\\d{2}"),
    "-",
    Preset.capture("day", "\\d{2}")
).build();

const match = "2024-03-15".match(datePattern);
console.log(match?.groups?.year);  // "2024"
console.log(match?.groups?.month); // "03"
console.log(match?.groups?.day);   // "15"

// Complex patterns with quantifiers
const wordPattern = Builder.of(Preset.word)
    .quantifier(Quantifiers.oneOrMore())
    .build();

console.log(wordPattern.test("abc123")); // true
console.log(wordPattern.test("@#$"));    // false
```

## API

### Builder Class

```ts
class Builder {
    static of(...values: string[]): BuilderInterface;
    add(...values: string[]): BuilderInterface;
    quantifier(quantifier: QuantifierType): BuilderInterface;
    build(flags?: string): RegExp;
}
```

### Preset Patterns

```ts
class Preset {
    static readonly digit: string;         // \d
    static readonly word: string;          // \w
    static readonly whitespace: string;    // \s
    static readonly latin: string;         // [a-zA-Z]
    static readonly latinLower: string;    // [a-z]
    static readonly latinUpper: string;    // [A-Z]
    static readonly capture: (name: string, pattern: string) => string;
    // ... and many more
}
```

### Quantifiers

```ts
class Quantifiers {
    static exactly(n: number): string;
    static atLeast(n: number): string;
    static between(n: number, m: number): string;
    static zeroOrMore(lazy?: boolean): string;
    static oneOrMore(lazy?: boolean): string;
    static zeroOrOne(lazy?: boolean): string;
}
```

## License

MIT 
