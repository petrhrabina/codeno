import Assert from "../Assert.ts";
import { assertThrows } from "jsr:@std/assert@^1.0";

function* definedDataProvider() {
    // Primitive values tests
    yield {
        name: "Number should pass defined check",
        test: () => 42,
        throws: false,
    };

    yield {
        name: "Zero should pass defined check",
        test: () => 0,
        throws: false,
    };

    yield {
        name: "Empty string should pass defined check",
        test: () => "",
        throws: false,
    };

    yield {
        name: "String should pass defined check",
        test: () => "test",
        throws: false,
    };

    yield {
        name: "Boolean true should pass defined check",
        test: () => true,
        throws: false,
    };

    yield {
        name: "Boolean false should pass defined check",
        test: () => false,
        throws: false,
    };

    // Object tests
    yield {
        name: "Empty object should pass defined check",
        test: () => ({}),
        throws: false,
    };

    yield {
        name: "Object with properties should pass defined check",
        test: () => ({ key: "value" }),
        throws: false,
    };

    yield {
        name: "Empty array should pass defined check",
        test: () => [],
        throws: false,
    };

    yield {
        name: "Array with values should pass defined check",
        test: () => [1, 2, 3],
        throws: false,
    };

    // Class instance tests
    yield {
        name: "Class instance should pass defined check",
        test: () => new Date(),
        throws: false,
    };

    // Function tests
    yield {
        name: "Function should pass defined check",
        test: () => () => {},
        throws: false,
    };

    // Falsy values tests (except null and undefined)
    yield {
        name: "NaN should pass defined check",
        test: () => NaN,
        throws: false,
    };

    // Undefined tests
    yield {
        name: "Undefined should fail defined check",
        test: () => undefined,
        throws: true,
    };

    yield {
        name: "Undefined variable should fail defined check",
        test: () => {
            let undef;
            return undef;
        },
        throws: true,
    };

    // Null tests
    yield {
        name: "Null should fail defined check",
        test: () => null,
        throws: true,
    };

    yield {
        name: "Explicitly set null should fail defined check",
        test: () => {
            const nullValue = null;
            return nullValue;
        },
        throws: true,
    };
}

Deno.test("defined", async (t) => {
    for (const { name, test, throws } of definedDataProvider()) {
        await t.step(name, () => {
            if (throws) {
                assertThrows(() => Assert.defined(test()));
            } else {
                Assert.defined(test());
            }
        });
    }
});
