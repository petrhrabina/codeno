import { JobInterface } from "./mod.ts";

/**
 * Mock implementation of the DataPool
 *
 * @example
 * ```typescript
 * const dataPool = DataPoolMock.getInstance();
 * dataPool.add("job1");
 * dataPool.add("job2");
 * console.log(dataPool.get()); // ["job1", "job2"]
 * ```
 *
 * @internal
 */
export class DataPoolMock {
    private static instance: DataPoolMock;

    private data: string[] = [];

    private constructor() {}

    public static getInstance(): DataPoolMock {
        if (!DataPoolMock.instance) {
            DataPoolMock.instance = new DataPoolMock();
        }

        return DataPoolMock.instance;
    }

    public add(value: string): void {
        this.data.push(value);
    }

    public get(): string[] {
        return Array.from(this.data);
    }

    public clear(): void {
        this.data = [];
    }
}

/**
 * Mock implementation of the JobInterface
 *
 * @example
 * ```typescript
 * const dataPool = DataPoolMock.getInstance();
 * const job = new JobMock(dataPool, "job1", 1000);
 * await job.run();
 * console.log(dataPool.get()); // ["job1"]
 * ```
 *
 * @internal
 */
export class JobMock implements JobInterface {
    private readonly jobName: string;
    private readonly delay: number;
    private readonly dataPool: DataPoolMock;

    public constructor(
        dataPool: DataPoolMock,
        jobName: string,
        delay: number,
    ) {
        this.dataPool = dataPool;
        this.jobName = jobName;
        this.delay = delay;
    }

    public async run(): Promise<void> {
        await new Promise((resolve) => setTimeout(resolve, this.delay));

        this.dataPool.add(this.jobName);
    }
}
