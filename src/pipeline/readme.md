# Pipeline

A TypeScript library for executing multiple jobs in sequence or parallel.

## Installation

```ts
import { DataPoolMock, type JobInterface, Pipeline } from "@ph/pipeline";
```

## Features

- Execute jobs in sequence
- Execute jobs in parallel
- Type-safe job interface
- Built-in mocking support for testing

## Usage

### Basic Example

```ts
import { DataPoolMock, type JobInterface, Pipeline } from "@ph/pipeline";

const dataPool = DataPoolMock.getInstance();

// Create a custom job
class SimpleJob implements JobInterface {
    public constructor(private readonly dataPool: DataPoolMock) {}

    public run(): void {
        this.dataPool.add("SimpleJob");
    }
}

// Execute jobs in sequence
const job = new SimpleJob(dataPool);
await new Pipeline([
    job,
    job,
]).sequence();

console.log(dataPool.get()); // ["SimpleJob", "SimpleJob"]
```

### Advanced Usage

```ts
import { DataPoolMock, type JobInterface, Pipeline } from "@ph/pipeline";

// Create a custom job
class SimpleJob implements JobInterface {
    public constructor(private readonly dataPool: DataPoolMock) {}

    public run(): void {
        this.dataPool.add("SimpleJob");
    }
}

const dataPool = DataPoolMock.getInstance();

class JobA implements JobInterface {
    public constructor(private readonly dataPool: DataPoolMock) {}

    public async run(): Promise<void> {
        await new Promise((resolve) => setTimeout(resolve, 50));
        this.dataPool.add("A");
    }
}

class JobB implements JobInterface {
    public constructor(private readonly dataPool: DataPoolMock) {}

    public async run(): Promise<void> {
        await new Promise((resolve) => setTimeout(resolve, 20));
        this.dataPool.add("B");
    }
}

const job = new SimpleJob(dataPool);
const pipeline = new Pipeline([
    new JobA(dataPool),
    new JobB(dataPool),
    job,
]);

// Sequential execution
dataPool.clear();
await pipeline.sequence();
console.log(dataPool.get()); // ["A", "B", "SimpleJob"]

// Parallel execution
dataPool.clear();
await pipeline.parallel();
console.log(dataPool.get()); // ["B", "SimpleJob", "A"]
```

## License

MIT
