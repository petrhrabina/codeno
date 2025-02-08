import { AssertTrueException } from "./exception/AssertTrueException.ts";
import { AssertFalseException } from "./exception/AssertFalseException.ts";
import { AssertCountException } from "./exception/AssertCountException.ts";
import { AssertInstanceOfException } from "./exception/AssertInstanceOfException.ts";
import { AssertDefinedException } from "./exception/AssertDefinedException.ts";
import { AssertArrayInstanceOf } from "./exception/AssertArrayInstanceOf.ts";

export default class Assert {
    public static true(expression: unknown): asserts expression {
        if (expression !== true) {
            throw new AssertTrueException("Assertion true failed");
        }
    }

    public static false(expression: unknown): asserts expression {
        if (expression !== false) {
            throw new AssertFalseException("Assertion false failed");
        }
    }

    public static count<T>(
        expression: Array<T> | Set<T> | Map<T, T> | Record<number | string, T>,
        count: number,
    ): asserts expression {
        if (expression instanceof Array) {
            if (expression.length !== count) {
                throw new AssertCountException("Assertion count failed");
            }
        } else if (expression instanceof Set) {
            if (expression.size !== count) {
                throw new AssertCountException("Assertion count failed");
            }
        } else if (expression instanceof Map) {
            if (expression.size !== count) {
                throw new AssertCountException("Assertion count failed");
            }
        } else {
            if (Object.keys(expression).length !== count) {
                throw new AssertCountException("Assertion count failed");
            }
        }
    }

    public static instanceOf<
        // deno-lint-ignore no-explicit-any
        T extends abstract new (...args: any[]) => any,
    >(
        actual: unknown,
        expectedType: T,
        msg = "",
    ): asserts actual is InstanceType<T> {
        if (actual instanceof expectedType) return;

        const msgSuffix = msg ? `: ${msg}` : ".";
        const expectedTypeStr = expectedType.name;

        let actualTypeStr = "";
        if (actual === null) {
            actualTypeStr = "null";
        } else if (actual === undefined) {
            actualTypeStr = "undefined";
        } else if (typeof actual === "object") {
            actualTypeStr = actual.constructor?.name ?? "Object";
        } else {
            actualTypeStr = typeof actual;
        }

        if (expectedTypeStr === actualTypeStr) {
            msg = `Expected object to be an instance of "${expectedTypeStr}"${msgSuffix}`;
        } else if (actualTypeStr === "function") {
            msg =
                `Expected object to be an instance of "${expectedTypeStr}" but was not an instanced object${msgSuffix}`;
        } else {
            msg =
                `Expected object to be an instance of "${expectedTypeStr}" but was "${actualTypeStr}"${msgSuffix}`;
        }

        throw new AssertInstanceOfException(msg);
    }

    public static defined(
        expression: unknown,
    ): asserts expression {
        if (expression === null || expression === undefined) {
            throw new AssertDefinedException("Assertion defined failed");
        }
    }

    public static arrayInstanceOf<T>(
        expression: Array<T> | Set<T> | Map<T, T> | Record<number | string, T>,
        instanceType: new (...args: unknown[]) => unknown,
    ): asserts expression {
        if (expression instanceof Array) {
            for (const item of expression) {
                if (!(item instanceof instanceType)) {
                    throw new AssertArrayInstanceOf("Assertion array instanceOf failed");
                }
            }
        } else if (expression instanceof Set) {
            for (const item of expression) {
                if (!(item instanceof instanceType)) {
                    throw new AssertArrayInstanceOf("Assertion array instanceOf failed");
                }
            }
        } else if (expression instanceof Map) {
            for (const [, value] of expression) {
                if (!(value instanceof instanceType)) {
                    throw new AssertArrayInstanceOf("Assertion array instanceOf failed");
                }
            }
        } else {
            for (const item of Object.values(expression)) {
                if (!(item instanceof instanceType)) {
                    throw new AssertArrayInstanceOf("Assertion array instanceOf failed");
                }
            }
        }
    }
}
