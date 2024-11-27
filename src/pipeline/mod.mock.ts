import { Job } from "./mod.ts";

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

export class JobMock implements Job {
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
