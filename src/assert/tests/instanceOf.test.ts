import Assert from "../Assert.ts";
import { assertThrows } from "jsr:@std/assert@^1.0";

function* instanceOfDataProvider() {
    // Basic class instance tests
    yield {
        name: "Instance of Date should pass Date check",
        test: () => {
            const date = new Date();
            return { actual: date, expected: Date };
        },
        throws: false,
    };

    yield {
        name: "Instance of Date should fail Number check",
        test: () => {
            const date = new Date();
            return { actual: date, expected: Number };
        },
        throws: true,
    };

    // Custom class tests
    yield {
        name: "Instance of custom class should pass its own class check",
        test: () => {
            class MyClass {}
            const instance = new MyClass();
            return { actual: instance, expected: MyClass };
        },
        throws: false,
    };

    yield {
        name: "Instance of custom class should fail different class check",
        test: () => {
            class MyClass {}
            class OtherClass {}
            const instance = new MyClass();
            return { actual: instance, expected: OtherClass };
        },
        throws: true,
    };

    // Inheritance tests
    yield {
        name: "Instance should pass parent class check",
        test: () => {
            class Parent {}
            class Child extends Parent {}
            const instance = new Child();
            return { actual: instance, expected: Parent };
        },
        throws: false,
    };

    yield {
        name: "Parent instance should fail child class check",
        test: () => {
            class Parent {}
            class Child extends Parent {}
            const instance = new Parent();
            return { actual: instance, expected: Child };
        },
        throws: true,
    };

    // Built-in types tests
    yield {
        name: "Array should pass Array check",
        test: () => {
            const arr = [1, 2, 3];
            return { actual: arr, expected: Array };
        },
        throws: false,
    };

    yield {
        name: "Object should fail Array check",
        test: () => {
            const obj = { key: "value" };
            return { actual: obj, expected: Array };
        },
        throws: true,
    };

    // Null and undefined tests
    yield {
        name: "Null should fail any class check",
        test: () => {
            return { actual: null, expected: Object };
        },
        throws: true,
    };

    yield {
        name: "Undefined should fail any class check",
        test: () => {
            return { actual: undefined, expected: Object };
        },
        throws: true,
    };

    // Primitive wrapper objects
    yield {
        name: "String object should pass String check",
        test: () => {
            const strObj = new String("test");
            return { actual: strObj, expected: String };
        },
        throws: false,
    };

    yield {
        name: "Primitive string should fail String object check",
        test: () => {
            const str = "test";
            return { actual: str, expected: String };
        },
        throws: true,
    };
}

Deno.test("instanceOf", async (t) => {
    for (const { name, test, throws } of instanceOfDataProvider()) {
        await t.step(name, () => {
            const { actual, expected } = test();
            if (throws) {
                assertThrows(() => Assert.instanceOf(actual, expected));
            } else {
                Assert.instanceOf(actual, expected);
            }
        });
    }
});
