/**
 * Interface for a job to be executed
 *
 * @returns {Promise<void>}
 */
export interface JobInterface {
    run(): Promise<void> | void;
}
/**
 * Interface for job pipeline execution
 */
interface PipelineInterface {
    /**
     * Executes jobs synchronously in sequence
     * Each job waits for the previous job to complete
     *
     * @returns {Promise<void>}
     */
    sequence(): Promise<void>;

    /**
     * Executes all jobs asynchronously in parallel
     * All jobs start at the same time
     *
     * @returns {Promise<void>}
     */
    parallel(): Promise<void>;
}

/**
 * Pipeline class for executing multiple jobs
 * Provides both synchronous and asynchronous execution strategies
 *
 * @example
 * ```ts
 * import { Pipeline, DataPoolMock, JobInterface, JobMock } from "@ph/pipeline";
 *
 * const dataPool = DataPoolMock.getInstance();
 *
 * export class MyJob implements JobInterface {
 *     public constructor(private readonly dataPool: DataPoolMock) {}
 *
 *   public run(): void {
 *       this.dataPool.add("MyJob");
 *   }
 * }
 *
 * // Simple sequence
 * await new Pipeline([
 *    new JobMock(dataPool, "A", 50),
 *    new MyJob(dataPool),
 * ]).sequence();
 *
 * console.log(dataPool.get()); // ["A", "MyJob"]
 *
 * // Sequence and parallel
 * const myPipeline = new Pipeline([
 *    new JobMock(dataPool, "A", 50),
 *    new JobMock(dataPool, "B", 20),
 *    new MyJob(dataPool),
 * ]);
 *
 * dataPool.clear();
 * await myPipeline.sequence();
 * console.log(dataPool.get()); // ["A", "B", "MyJob"]
 *
 * dataPool.clear();
 * await myPipeline.parallel();
 * console.log(dataPool.get()); // ["MyJob", "B", "A"]
 * ```
 */
export class Pipeline implements PipelineInterface {
    private jobs: JobInterface[];

    /**
     * Creates a new Pipeline instance
     *
     * @param {JobInterface[]} jobs - Array of jobs to be executed
     */
    public constructor(
        jobs: JobInterface[],
    ) {
        this.jobs = jobs;
    }

    /**
     * Executes jobs one after another in sequence
     * Waits for each job to complete before starting the next one
     *
     * @returns {Promise<void>}
     *
     * @example
     * ```ts
     * import { Pipeline, DataPoolMock, JobInterface, JobMock } from "@ph/pipeline";
     *
     * const dataPool = DataPoolMock.getInstance();
     *
     * const myPipeline = new Pipeline([
     *    new JobMock(dataPool, "A", 50),
     *    new JobMock(dataPool, "B", 20),
     * ]);
     *
     * await myPipeline.sequence(); // JobA finishes, then JobB starts
     * ```
     */
    public async sequence(): Promise<void> {
        for (const job of this.jobs) {
            await job.run();
        }
    }

    /**
     * Executes all jobs simultaneously
     * Does not wait for previous jobs to complete
     *
     * @returns {Promise<void>}
     *
     * @example
     * ```ts
     * import { Pipeline, DataPoolMock, JobInterface, JobMock } from "@ph/pipeline";
     *
     * const dataPool = DataPoolMock.getInstance();
     *
     * const myPipeline = new Pipeline([
     *    new JobMock(dataPool, "A", 50),
     *    new JobMock(dataPool, "B", 20),
     * ]);
     *
     * await myPipeline.parallel(); // JobA and JobB start at the same time
     * ```
     */
    public async parallel(): Promise<void> {
        await Promise.all(
            this.jobs.map((job) => job.run()),
        );
    }
}
