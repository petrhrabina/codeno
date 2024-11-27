import Pipeline, { DataPoolMock, JobMock } from "./mod.ts";
import Assert from "@ph/assert";
import { delay } from "jsr:@std/async/delay";

const createPipelineInstance: () => Pipeline = (): Pipeline => {
    const dataPool = DataPoolMock.getInstance();

    return new Pipeline([
        new JobMock(dataPool, "A", 30),
        new JobMock(dataPool, "B", 10),
        new JobMock(dataPool, "C", 20),
    ]);
};

Deno.test("sequence", async () => {
    const dataPool = DataPoolMock.getInstance();
    const pipeline = createPipelineInstance();

    dataPool.clear();
    await pipeline.sequence();

    Assert.sameArray(["A", "B", "C"], dataPool.get());
});

Deno.test("parallel", async () => {
    const dataPool = DataPoolMock.getInstance();
    const pipeline = createPipelineInstance();

    dataPool.clear();
    await pipeline.parallel();

    Assert.sameArray(["B", "C", "A"], dataPool.get());
});

Deno.test("combined sync and async run", async () => {
    const dataPool = DataPoolMock.getInstance();
    const pipeline = createPipelineInstance();

    dataPool.clear();
    pipeline.parallel();
    pipeline.sequence();
    pipeline.parallel();

    await delay(200);

    Assert.sameArray([
        "B",
        "B",
        "C",
        "C",
        "A",
        "A",
        "A",
        "B",
        "C",
    ], dataPool.get());
});
