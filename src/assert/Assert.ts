import { assert, assertEquals, assertFalse } from "jsr:@std/assert@^1.0";

/**
 * Class providing assertion utilities for defensive code use case coverage
 *
 * @example
 * ```ts
 * import { Assert } from "@ph/assert";
 *
 * Assert.true(true)
 * Assert.false(false)
 *
 * ```
 * @class
 */
export class Assert {
    /**
     * Asserts that a value is true
     *
     * @example
     * ```ts
     * import { Assert } from "@ph/assert";
     *
     * // Passes
     * const value = true;
     * Assert.true(value)
     * // Or
     * const x = 5;
     * Assert.true(x > 0)
     * ```
     *
     * @param {boolean} value - The value to check
     * @param {string} msg - The message to throw when the value is false
     * @throws {AssertionError} When the value is false
     */
    public static true(value: boolean, msg?: string): void {
        assert(value, msg);
    }

    /**
     * Asserts that a value is false
     *
     * @example
     * ```ts
     * import { Assert } from "@ph/assert";
     * Assert.false(5 < 0)
     * ```
     *
     * @param {boolean} value - The value to check
     * @throws {AssertionError} When the value is true
     */
    public static false(value: boolean): void {
        assertFalse(value);
    }

    /**
     * Asserts that two values are equal using non-strict comparison
     *
     * @example
     * ```ts
     * import { Assert } from "@ph/assert";
     * Assert.same(1, 1)
     * ```
     *
     * @param {unknown} expected - The expected value
     * @param {unknown} actual - The actual value to compare
     * @throws {AssertionError} When values are not equal
     */
    public static same(expected: unknown, actual: unknown): void {
        assertEquals(expected, actual);
    }

    /**
     * Asserts that two values are equal using strict comparison
     *
     * @example
     * ```ts
     * import { Assert } from "@ph/assert";
     * Assert.sameArray([1, 2, 3], [1, 2, 3])
     * ```
     *
     * @param {unknown[]} expected - The expected value
     * @param {unknown[]} actual - The actual value to compare
     * @throws {AssertionError} When values are not strictly equal
     */
    public static sameArray(expected: unknown[], actual: unknown[]): void {
        assertEquals(expected, actual);
    }

    /**
     * Asserts that a string matches a regular expression pattern
     *
     * @example
     * ```ts
     * import { Assert } from "@ph/assert";
     * Assert.matchRegexp(/\d+/, "123")
     * ```
     *
     * @param {RegExp} pattern - The regular expression pattern to test
     * @param {string} testcase - The string to test against the pattern
     * @throws {AssertionError} When the string doesn't match the pattern
     */
    public static matchRegexp(pattern: RegExp, testcase: string): void {
        assert(pattern.test(testcase));
    }

    /**
     * Asserts that a string does not match a regular expression pattern
     *
     * @example
     * ```ts
     * import { Assert } from "@ph/assert";
     * Assert.notMatchRegexp(/\d+/, "abc")
     * ```
     *
     * @param {RegExp} pattern - The regular expression pattern to test
     * @param {string} testcase - The string to test against the pattern
     * @throws {AssertionError} When the string matches the pattern
     */
    public static notMatchRegexp(pattern: RegExp, testcase: string): void {
        assertFalse(pattern.test(testcase));
    }
}
