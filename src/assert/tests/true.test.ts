import Assert from "../Assert.ts";
import { assertThrows } from "jsr:@std/assert@^1.0";

function* trueDataProvider() {
    yield {
        name: "True boolean literal returns true",
        test: () => true,
        throws: false,
    };

    yield {
        name: "False boolean literal returns false, triggering failure",
        test: () => false,
        throws: true,
    };

    yield {
        name: "Equality test: identical numbers are equal",
        test: () => {
            const a: number = 1;
            const b: number = 1;
            return a === b;
        },
        throws: false,
    };

    yield {
        name: "Equality test: different numbers are not equal",
        test: () => {
            const a: number = 1;
            const b: number = 2;
            return a === b;
        },
        throws: true,
    };

    yield {
        name: "Array test: array with three elements passes length check",
        test: () => {
            const myArray = [1, 2, 3];
            return myArray.length === 3;
        },
        throws: false,
    };

    yield {
        name: "Array test: array with two elements fails length check",
        test: () => {
            const myArray = [1, 2];
            return myArray.length === 3;
        },
        throws: true,
    };

    yield {
        name: "Reference equality: same instance returns true",
        test: () => {
            class MyClass {}
            const myClassInstance = new MyClass();
            const myClassInstanceCopy = myClassInstance;
            return myClassInstance === myClassInstanceCopy;
        },
        throws: false,
    };

    yield {
        name: "Reference equality: separate instances are not equal",
        test: () => {
            class MyClass {}
            const myClassInstance = new MyClass();
            const myClassInstance2 = new MyClass();
            return myClassInstance === myClassInstance2;
        },
        throws: true,
    };

    yield {
        name: "Negation check: inequality on identical instances fails",
        test: () => {
            class MyClass {}
            const myClassInstance = new MyClass();
            const myClassInstanceCopy = myClassInstance;
            return myClassInstance !== myClassInstanceCopy;
        },
        throws: true,
    };

    yield {
        name: "Negation check: inequality on separate instances succeeds",
        test: () => {
            class MyClass {}
            const myClassInstance = new MyClass();
            const myClassInstance2 = new MyClass();
            return myClassInstance !== myClassInstance2;
        },
        throws: false,
    };

    yield {
        name: "Number 1 is truthy but not exactly boolean true",
        test: () => 1,
        throws: true,
    };

    yield {
        name: "String 'true' is truthy but not exactly boolean true",
        test: () => "true",
        throws: true,
    };

    yield {
        name: "new Boolean(true) object is truthy but not strictly equal to true",
        test: () => new Boolean(true),
        throws: true,
    };

    yield {
        name: "Undefined value fails the assertion",
        test: () => undefined,
        throws: true,
    };

    yield {
        name: "Null value fails the assertion",
        test: () => null,
        throws: true,
    };

    yield {
        name: "Empty object literal fails the assertion",
        test: () => ({}),
        throws: true,
    };

    yield {
        name: "Non-empty object literal fails the assertion",
        test: () => ({ key: "value" }),
        throws: true,
    };

    yield {
        name: "Array literal containing true fails the assertion",
        test: () => [true],
        throws: true,
    };
}

Deno.test("true", async (t) => {
    for (const { name, test, throws } of trueDataProvider()) {
        await t.step(name, () => {
            if (throws) {
                assertThrows(() => Assert.true(test()));
            } else {
                Assert.true(test());
            }
        });
    }
});
