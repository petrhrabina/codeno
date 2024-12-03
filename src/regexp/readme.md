# RegExp Builder

A TypeScript library for building regular expressions with a fluent interface and
predefined patterns.

## Installation

```ts
import {
    Builder,
    type BuilderInterface,
    Preset,
    Quantifiers,
    type QuantifierType,
} from "@ph/regexp";
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
import {
    Builder,
    type BuilderInterface,
    Preset,
    Quantifiers,
    type QuantifierType,
} from "@ph/regexp";

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
import { Builder, Preset, Quantifiers } from "@ph/regexp";

// Named capturing groups
const datePattern = Builder.of(
    Preset.capture("year", "\\d{4}"),
    "-",
    Preset.capture("month", "\\d{2}"),
    "-",
    Preset.capture("day", "\\d{2}"),
).build();

const match = "2024-03-15".match(datePattern);
console.log(match?.groups?.year); // "2024"
console.log(match?.groups?.month); // "03"
console.log(match?.groups?.day); // "15"

// Complex patterns with quantifiers
const wordPattern = Builder.of(Preset.word)
    .quantifier(Quantifiers.oneOrMore())
    .build();

console.log(wordPattern.test("abc123")); // true
console.log(wordPattern.test("@#$")); // false
```

## License

MIT
