# Template

A lightweight TypeScript template engine with support for modifiers and dynamic value
formatting.

## Installation

```ts
import { type Key, Template, type Value } from "@ph/template";
```

## Features

- Simple string interpolation with {{placeholders}}
- Support for value modifiers
- Chainable API
- Multiple value types support (string, number, boolean, null)
- Custom formatting functions

## Usage

### Basic Example

```ts
import { type Key, Template, type Value } from "@ph/template";

// Simple placeholder replacement
const template = Template.create("Hello {{name}}!")
    .set("name", "World");

console.log(template.render()); // Output: Hello World!

// Multiple placeholders
const userTemplate = Template.create(`
User: {{name}}
Age: {{age}}
Active: {{isActive}}
`)
    .set("name", "John")
    .set("age", 30)
    .set("isActive", true);

console.log(userTemplate.render());
// Output:
// User: John
// Age: 30
// Active: true
```

### Advanced Usage with Modifiers

```ts
import { type Key, Template, type Value } from "@ph/template";

const template = Template.create(`
{{name:user}}: {{red:message}}
{{upper:response}}
`);

// Set basic values
template
    .set("user", "Admin")
    .set("message", "Access denied")
    .set("response", "please try again");

// Add modifiers
template
    .set("name", (value: string) => `@${value}`)
    .set("red", (value: string) => `\x1b[31m${value}\x1b[0m`)
    .set("upper", (value: string) => value.toUpperCase());

console.log(template.render());
// Output:
// @Admin: [red]Access denied[/red]
// PLEASE TRY AGAIN
```

## License

MIT
