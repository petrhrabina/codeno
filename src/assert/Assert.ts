import { AssertTrueException } from "./exception/AssertTrueException.ts";
import { AssertFalseException } from "./exception/AssertFalseException.ts";
import { AssertCountException } from "./exception/AssertCountException.ts";
import { AssertInstanceOfException } from "./exception/AssertInstanceOfException.ts";
import { AssertDefinedException } from "./exception/AssertDefinedException.ts";
import { AssertArrayInstanceOf } from "./exception/AssertArrayInstanceOf.ts";

/**
 * Class providing assertion utilities for defensive code use case coverage
 *
 * @example
 * ```ts
 * import { Assert } from "@ph/assert";
 *
 * Assert.true(true)
 * Assert.false(false)
 * Assert.count<number>([1,2,3], 3);
 * ```
 * @class
 */
export default class Assert {
    /**
     * Asserts that a value is true
     *
     * @example
     * ```ts
     * import { Assert } from "@ph/assert";
     *
     * Assert.true(5 > 0)
     * ```
     *
     * @param {unknown} expression - The expression to check
     * @throws {AssertTrueException} When the value is false
     */
    public static true(expression: unknown): asserts expression {
        if (expression !== true) {
            throw new AssertTrueException("Assertion true failed");
        }
    }

    /**
     * Asserts that a value is false
     *
     * @example
     * ```ts
     * import { Assert } from "@ph/assert";
     *
     * Assert.false(5 < 0)
     * ```
     *
     * @param {unknown} expression - The expression to check
     * @throws {AssertFalseException} When the value is true
     */
    public static false(expression: unknown): asserts expression {
        if (expression !== false) {
            throw new AssertFalseException("Assertion false failed");
        }
    }

    /**
     * Asserts that the number of elements in an array/set/map/record matches the expected count
     *
     * @example
     * ```ts
     * import { Assert } from "@ph/assert";
     *
     * const myArray = new Array<number>();
     *
     * myArray.push(1);
     * myArray.push(2);
     *
     * Assert.count<number>(myArray, 2);
     * ```
     *
     * @param {Array} expression - The array to check
     * @param {number} count - The expected number of elements
     * @throws {AssertCountException} When the number of elements does not match the expected count
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
     * Make an assertion that `obj` is an instance of `type`.
     * If not then throw.
     *
     * @example Usage
     * ```ts ignore
     * import { assertInstanceOf } from "@std/assert";
     *
     * assertInstanceOf(new Date(), Date); // Doesn't throw
     * assertInstanceOf(new Date(), Number); // Throws
     * ```
     *
     * @typeParam T The expected type of the object.
     * @param actual The object to check.
     * @param expectedType The expected class constructor.
     * @param msg The optional message to display if the assertion fails.
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
     * Asserts that a value is defined (not null or undefined)
     *
     * @example
     * ```ts
     * import { Assert } from "@ph/assert";
     *
     * Assert.defined(1);
     * // Assert.defined(undefined); throw AssertDefinedException
     * ```
     *
     * @param {T | null | undefined} expression - The expression to check
     * @throws {AssertDefinedException} When the value is null or undefined
     */
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
