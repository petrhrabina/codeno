# Template

A lightweight TypeScript template engine with support for modifiers and dynamic value formatting.

## Installation

```ts
import { Template } from "@ph4/template";
```

## Features

- Simple string interpolation with {{placeholders}}
- Support for value modifiers
- Chainable API
- Multiple value types support (string, number, boolean, null)
- Custom formatting functions
- Type-safe interface

## Usage

### Basic Example

```ts
import { Template } from "@ph4/template";

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
import { Template } from "@ph4/template";

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

## API

### Template Class

```ts
class Template {
    static create(template: string): Template;
    set(key: Key, value: Value): Template;
    render(): string;
}
```

### Types

```ts
type Key = string | number;

type CallableValue = (value: string) => string;

type Value = string | number | boolean | null | CallableValue;
```

### Placeholder Syntax

- Basic placeholder: `{{key}}`
- Modifier placeholder: `{{modifier:value}}`

Examples:
```ts
// Basic
{{name}}         // Replaced with value of "name"

// With modifier
{{upper:text}}   // Applies "upper" modifier to value of "text"
{{red:error}}    // Applies "red" modifier to value of "error"
```

## License

MIT 
