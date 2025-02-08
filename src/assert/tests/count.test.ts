import Assert from "../Assert.ts";
import { assertThrows } from "jsr:@std/assert@^1.0";

function* countDataProvider() {
    // Array tests
    yield {
        name: "Empty array has count 0",
        test: () => {
            const arr: number[] = [];
            return { collection: arr, expectedCount: 0 };
        },
        throws: false,
    };

    yield {
        name: "Array with three elements has count 3",
        test: () => {
            const arr = [1, 2, 3];
            return { collection: arr, expectedCount: 3 };
        },
        throws: false,
    };

    yield {
        name: "Array with two elements does not match expected count 3",
        test: () => {
            const arr = [1, 2];
            return { collection: arr, expectedCount: 3 };
        },
        throws: true,
    };

    // Set tests
    yield {
        name: "Empty Set has count 0",
        test: () => {
            const set = new Set<number>();
            return { collection: set, expectedCount: 0 };
        },
        throws: false,
    };

    yield {
        name: "Set with three unique elements has count 3",
        test: () => {
            const set = new Set([1, 2, 3]);
            return { collection: set, expectedCount: 3 };
        },
        throws: false,
    };

    yield {
        name: "Set with two elements does not match expected count 3",
        test: () => {
            const set = new Set([1, 2]);
            return { collection: set, expectedCount: 3 };
        },
        throws: true,
    };

    // Map tests
    yield {
        name: "Empty Map has count 0",
        test: () => {
            const map = new Map<number, number>();
            return { collection: map, expectedCount: 0 };
        },
        throws: false,
    };

    yield {
        name: "Map with three pairs has count 3",
        test: () => {
            const map = new Map([[1, 1], [2, 2], [3, 3]]);
            return { collection: map, expectedCount: 3 };
        },
        throws: false,
    };

    yield {
        name: "Map with two pairs does not match expected count 3",
        test: () => {
            const map = new Map([[1, 1], [2, 2]]);
            return { collection: map, expectedCount: 3 };
        },
        throws: true,
    };

    // Record tests
    yield {
        name: "Empty Record has count 0",
        test: () => {
            const record: Record<string, number> = {};
            return { collection: record, expectedCount: 0 };
        },
        throws: false,
    };

    yield {
        name: "Record with three properties has count 3",
        test: () => {
            const record = { a: 1, b: 2, c: 3 };
            return { collection: record, expectedCount: 3 };
        },
        throws: false,
    };

    yield {
        name: "Record with two properties does not match expected count 3",
        test: () => {
            const record = { a: 1, b: 2 };
            return { collection: record, expectedCount: 3 };
        },
        throws: true,
    };
}

Deno.test("count", async (t) => {
    for (const { name, test, throws } of countDataProvider()) {
        await t.step(name, () => {
            const { collection, expectedCount } = test();
            if (throws) {
                assertThrows(() => Assert.count(collection, expectedCount));
            } else {
                Assert.count(collection, expectedCount);
            }
        });
    }
});
