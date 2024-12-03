# Validator

A lightweight TypeScript validator module that provides a flexible way to create and use
custom validation rules.

## Installation

```ts
import { Validator } from "@ph/validator";
```

## Features

- Simple and flexible validation interface
- Chainable API
- Type-safe implementation
- Custom validation methods support
- Zero dependencies

## Usage

### Basic Example

```ts
import { Validator } from "@ph/validator";

// Create a simple non-empty string validator
const isNonEmpty = Validator.create((value: string) => value.length > 0);

console.log(isNonEmpty.validate("Hello")); // Output: true
console.log(isNonEmpty.validate("")); // Output: false

// Email validation example
const isEmail = Validator.create((value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
});

console.log(isEmail.validate("user@example.com")); // Output: true
console.log(isEmail.validate("invalid-email")); // Output: false
```

### Advanced Usage

```ts
import { Validator } from "@ph/validator";

// Combining multiple validation rules
const hasMinLength = (value: string): boolean => value.length >= 8;
const hasNumber = (value: string): boolean => /\d/.test(value);
const hasSpecialChar = (value: string): boolean => /[!@#$%^&*]/.test(value);

const isStrongPassword = Validator.create((value: string): boolean =>
    hasMinLength(value) &&
    hasNumber(value) &&
    hasSpecialChar(value)
);

console.log(isStrongPassword.validate("weak")); // Output: false
console.log(isStrongPassword.validate("Strong#Pass123")); // Output: true
```

## License

MIT
