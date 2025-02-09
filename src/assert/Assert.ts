import { AssertTrueException } from "./exception/AssertTrueException.ts";
import { AssertFalseException } from "./exception/AssertFalseException.ts";
import { AssertCountException } from "./exception/AssertCountException.ts";
import { AssertInstanceOfException } from "./exception/AssertInstanceOfException.ts";
import { AssertDefinedException } from "./exception/AssertDefinedException.ts";
import { AssertArrayInstanceOf } from "./exception/AssertArrayInstanceOf.ts";

export default class Assert {
    /**
     * Asserts that the provided expression is strictly true.
     *
     * @param expression - The expression to evaluate.
     * @throws {AssertTrueException} If the expression is not strictly true.
     *
     * @example
     * ```ts
     * import Assert from "@ph/assert";
     * Assert.true(true);
     * ```
     */
    public static true(expression: unknown): asserts expression {
        if (expression !== true) {
            throw new AssertTrueException("Assertion true failed");
        }
    }

    /**
     * Asserts that the provided expression is strictly false.
     *
     * @param expression - The expression to evaluate.
     * @throws {AssertFalseException} If the expression is not strictly false.
     *
     * @example
     * ```ts
     * import Assert from "@ph/assert";
     * Assert.false(false);
     * ```
     */
    public static false(expression: unknown): asserts expression {
        if (expression !== false) {
            throw new AssertFalseException("Assertion false failed");
        }
    }

    /**
     * Asserts that the count of elements in a collection matches the expected count.
     *
     * The collection can be an Array, Set, Map, or a Record.
     *
     * @template T - The type of elements in the collection.
     * @param expression - The collection whose count is to be checked.
     * @param count - The expected number of elements or properties.
     * @throws {AssertCountException} If the actual count does not match the expected count.
     *
     * @example
     * ```ts
     * import Assert from "@ph/assert";
     * Assert.count([1, 2, 3], 3);
     * ```
     */
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

    /**
     * Asserts that a given value is an instance of the specified constructor.
     *
     * @template T - The type corresponding to the expected constructor.
     * @param actual - The value to check.
     * @param expectedType - The constructor function to validate against.
     * @param msg - Optional additional message for the error.
     * @throws {AssertInstanceOfException} If the value is not an instance of the expected type.
     *
     * @example
     * ```ts
     * import Assert from "@ph/assert";
     * Assert.instanceOf(new Date(), Date);
     * ```
     */
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

    /**
     * Asserts that the provided expression is defined (i.e., not null or undefined).
     *
     * @param expression - The expression to validate.
     * @throws {AssertDefinedException} If the expression is undefined or null.
     *
     * @example
     * ```ts
     * import Assert from "@ph/assert";
     * Assert.defined(42);
     * Assert.defined("Hello");
     * ```
     */
    public static defined(
        expression: unknown,
    ): asserts expression {
        if (expression === null || expression === undefined) {
            throw new AssertDefinedException("Assertion defined failed");
        }
    }

    /**
     * Asserts that every element in a collection is an instance of the specified type.
     *
     * The collection can be an Array, Set, Map, or a Record.
     *
     * @template T - The type of elements in the collection.
     * @param expression - The collection containing elements to check.
     * @param instanceType - The constructor function that all elements should be an instance of.
     * @throws {AssertArrayInstanceOf} If any element is not an instance of the specified type.
     *
     * @example
     * ```ts
     * import Assert from "@ph/assert";
     * Assert.arrayInstanceOf([new Date(), new Date()], Date);
     * ```
     */
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
