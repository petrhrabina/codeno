import Assert from "../Assert.ts";
import { assertThrows } from "jsr:@std/assert@^1.0";

function* arrayInstanceOfDataProvider() {
    // Array tests
    yield {
        name: "Empty array should pass any type check",
        test: () => {
            const arr: Date[] = [];
            return { collection: arr, type: Date };
        },
        throws: false,
    };

    yield {
        name: "Array of dates should pass Date check",
        test: () => {
            const arr = [new Date(), new Date()];
            return { collection: arr, type: Date };
        },
        throws: false,
    };

    yield {
        name: "Array with mixed types should fail Date check",
        test: () => {
            const arr = [new Date(), "not a date"];
            return { collection: arr, type: Date };
        },
        throws: true,
    };

    // Set tests
    yield {
        name: "Empty Set should pass any type check",
        test: () => {
            const set = new Set<Date>();
            return { collection: set, type: Date };
        },
        throws: false,
    };

    yield {
        name: "Set of dates should pass Date check",
        test: () => {
            const set = new Set([new Date(), new Date()]);
            return { collection: set, type: Date };
        },
        throws: false,
    };

    yield {
        name: "Set with mixed types should fail Date check",
        test: () => {
            const set = new Set([new Date(), "not a date"]);
            return { collection: set, type: Date };
        },
        throws: true,
    };

    // Map tests
    yield {
        name: "Empty Map should pass any type check",
        test: () => {
            const map = new Map<string, Date>();
            return { collection: map, type: Date };
        },
        throws: false,
    };

    yield {
        name: "Map with date values should pass Date check",
        test: () => {
            const map = new Map([
                ["first", new Date()],
                ["second", new Date()],
            ]);
            return { collection: map, type: Date };
        },
        throws: false,
    };

    yield {
        name: "Map with mixed value types should fail Date check",
        test: () => {
            const map = new Map<string, unknown>([
                ["date", new Date()],
                ["string", "not a date"],
            ]);
            return { collection: map, type: Date };
        },
        throws: true,
    };

    // Record tests
    yield {
        name: "Empty Record should pass any type check",
        test: () => {
            const record: Record<string, Date> = {};
            return { collection: record, type: Date };
        },
        throws: false,
    };

    yield {
        name: "Record with date values should pass Date check",
        test: () => {
            const record = {
                first: new Date(),
                second: new Date(),
            };
            return { collection: record, type: Date };
        },
        throws: false,
    };

    yield {
        name: "Record with mixed value types should fail Date check",
        test: () => {
            const record: Record<string, unknown> = {
                date: new Date(),
                string: "not a date",
            };
            return { collection: record, type: Date };
        },
        throws: true,
    };

    // Custom class tests
    class TestClass {
        constructor(..._args: unknown[]) {
            // Constructor implementation not important for test
        }
    }

    yield {
        name: "Array of custom class instances should pass custom class check",
        test: () => {
            const arr = [
                new TestClass(),
                new TestClass(),
            ];
            return { collection: arr as unknown[], type: TestClass };
        },
        throws: false,
    };

    yield {
        name: "Set of custom class instances should pass custom class check",
        test: () => {
            const set = new Set([
                new TestClass(),
                new TestClass(),
            ]);
            return { collection: set as Set<unknown>, type: TestClass };
        },
        throws: false,
    };

    // Inheritance tests
    class Parent {
        constructor(..._args: unknown[]) {
            // Constructor implementation not important for test
        }
    }
    class Child extends Parent {
        constructor(...args: unknown[]) {
            super(...args);
        }
    }

    yield {
        name: "Array of child instances should pass parent class check",
        test: () => {
            const arr = [
                new Child(),
                new Child(),
            ];
            return { collection: arr as unknown[], type: Parent };
        },
        throws: false,
    };

    yield {
        name: "Array of parent instances should fail child class check",
        test: () => {
            const arr = [
                new Parent(),
                new Parent(),
            ];
            return { collection: arr as unknown[], type: Child };
        },
        throws: true,
    };
}

Deno.test("arrayInstanceOf", async (t) => {
    for (const { name, test, throws } of arrayInstanceOfDataProvider()) {
        await t.step(name, () => {
            const { collection, type } = test();
            if (throws) {
                assertThrows(() => Assert.arrayInstanceOf(collection, type));
            } else {
                Assert.arrayInstanceOf(collection, type);
            }
        });
    }
});
