# Reflection

A lightweight TypeScript reflection utility for accessing object properties, including private and static members.

## Installation

```ts
import { Reflection } from "@ph/reflection";
```

## Features

- Access instance and static properties
- Type-safe property access
- Simple and intuitive API
- Support for private members
- Zero dependencies
- Lightweight implementation

## Usage

### Basic Example

```ts
import { Reflection } from "@ph/reflection";

class User {
    private static name: string;
    public readonly age: number;

    constructor(name: string, age: number) {
        User.name = name;
        this.age = age;
    }
}

const user = new User("John", 30);
const reflection = Reflection.of(user);

console.log(reflection.getPropertyValue("name")); // Output: "John"
console.log(reflection.getPropertyValue("age")); // Output: 30
```

### Advanced Usage

```ts
class Database {
    private static connection: string;
    private config: Record<string, unknown>;

    constructor(config: Record<string, unknown>) {
        Database.connection = "mysql://localhost:3306";
        this.config = config;
    }

    public static setConnection(url: string): void {
        Database.connection = url;
    }
}

const db = new Database({ timeout: 5000 });
Database.setConnection("postgres://localhost:5432");

const reflection = Reflection.of(db);
console.log(reflection.getPropertyValue("connection")); // Output: "postgres://localhost:5432"
console.log(reflection.getPropertyValue("config")); // Output: { timeout: 5000 }
```

## API

### Reflection Class

```ts
class Reflection {
    static of(target: object): Reflection;
    getPropertyValue<T>(propertyKey: PropertyKey): T;
}
```

### Types

```ts
type Target = typeof Object;

// Usage with type safety
const value = reflection.getPropertyValue<string>("propertyName");
```

## License

MIT 
