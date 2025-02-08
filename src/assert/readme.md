A TypeScript assertion module providing robust type checking and validation utilities for
defensive programming.

## Usage

```typescript
import Assert from "@ph/assert";

// Boolean assertions
Assert.true(5 > 0);
Assert.false(5 < 0);

// Collection count assertions
const numbers = [1, 2, 3];
Assert.count(numbers, 3);

const users = new Set(["John", "Jane"]);
Assert.count(users, 2);

const scores = new Map([["John", 100], ["Jane", 95]]);
Assert.count(scores, 2);

const config = { debug: true, env: "prod" };
Assert.count(config, 2);

// Type checking
const date = new Date();
Assert.instanceOf(date, Date);

// Null/undefined checking
const value = getValue();
Assert.defined(value);

// Array type checking
const dates = [new Date(), new Date()];
Assert.arrayInstanceOf(dates, Date);

const users = new Set([new User(), new User()]);
Assert.arrayInstanceOf(users, User);
```

## API Reference

### `Assert.true(expression: unknown)`

Asserts that a value is strictly true.

### `Assert.false(expression: unknown)`

Asserts that a value is strictly false.

### `Assert.count<T>(collection, count: number)`

Asserts that a collection has exactly the specified number of elements.

- Supports Array, Set, Map, and Record types
- Throws AssertCountException if count doesn't match

### `Assert.instanceOf<T>(actual: unknown, expectedType: T)`

Asserts that a value is an instance of the specified type.

- Provides detailed error messages for different scenarios
- Supports custom error messages

### `Assert.defined(expression: unknown)`

Asserts that a value is neither null nor undefined.

### `Assert.arrayInstanceOf<T>(collection, instanceType)`

Asserts that all elements in a collection are instances of the specified type.

- Supports Array, Set, Map values, and Record values
- Useful for validating collection element types

## Error Types

- `AssertTrueException`: Thrown when true assertion fails
- `AssertFalseException`: Thrown when false assertion fails
- `AssertCountException`: Thrown when count doesn't match
- `AssertInstanceOfException`: Thrown when type check fails
- `AssertDefinedException`: Thrown when value is null/undefined
- `AssertArrayInstanceOf`: Thrown when collection element type check fails

## Contributing

Feel free to submit issues and enhancement requests.
