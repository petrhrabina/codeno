# Pipeline

A TypeScript library for executing multiple jobs in sequence or parallel.

## Installation

```ts
import { Pipeline } from "@ph4/pipeline";
```

## Features

- Execute jobs in sequence
- Execute jobs in parallel
- Type-safe job interface
- Built-in mocking support for testing

## Usage

### Basic Example

```ts
import { Pipeline, DataPoolMock, JobInterface, JobMock } from "@ph4/pipeline";

const dataPool = DataPoolMock.getInstance();

// Create a custom job
export class MyJob implements JobInterface {
    public constructor(private readonly dataPool: DataPoolMock) {}

    public run(): void {
        this.dataPool.add("MyJob");
    }
}

// Execute jobs in sequence
await new Pipeline([
    new JobMock(dataPool, "A", 50),
    new MyJob(dataPool),
]).sequence();

console.log(dataPool.get()); // ["A", "MyJob"]
```

### Advanced Usage

```ts
const myPipeline = new Pipeline([
    new JobMock(dataPool, "A", 50),
    new JobMock(dataPool, "B", 20),
    new MyJob(dataPool),
]);

// Sequential execution
dataPool.clear();
await myPipeline.sequence();
console.log(dataPool.get()); // ["A", "B", "MyJob"]

// Parallel execution
dataPool.clear();
await myPipeline.parallel();
console.log(dataPool.get()); // ["MyJob", "B", "A"]
```

## API

### Pipeline Class

```ts
class Pipeline {
    constructor(jobs: JobInterface[]);
    sequence(): Promise<void>;
    parallel(): Promise<void>;
}
```

### JobInterface

```ts
interface JobInterface {
    run(): void | Promise<void>;
}
```

## License

MIT
