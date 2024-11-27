/** Type representing a quantifier pattern */
export type QuantifierType = string;

/**
 * Class containing methods for regular expression quantifiers
 */
export class Quantifiers {
    /**
     * Creates a quantifier that matches exactly n occurrences
     *
     * ```ts
     * import { Quantifiers } from "@ph/regexp";
     * console.log(Quantifiers.exactly(3)); // Output: {3}
     * // \d{3} // matches "123" in "12345"
     * // [abc]{2} // matches "ab" in "abcde"
     * ```
     *
     * @param {number} n - The exact number of occurrences
     * @returns {QuantifierType} The quantifier pattern
     */
    public static exactly(n: number): QuantifierType {
        return `{${n}}`;
    }

    /**
     * Creates a quantifier that matches n or more occurrences
     *
     * ```ts
     * import { Quantifiers } from "@ph/regexp";
     * console.log(Quantifiers.atLeast(2)); // Output: {2,}
     * // \d{2,} // matches "123", "1234" in "12345"
     * // [abc]{3,} // matches "abcabc" in "abcabcd"
     * ```
     *
     * @param {number} n - The minimum number of occurrences
     * @returns {QuantifierType} The quantifier pattern
     */
    public static atLeast(n: number): QuantifierType {
        return `{${n},}`;
    }

    /**
     * Creates a quantifier that matches between n and m occurrences
     *
     * ```ts
     * import { Quantifiers } from "@ph/regexp";
     * console.log(Quantifiers.between(2, 4)); // Output: {2,4}
     * // \d{2,4} // matches "12", "123", "1234" in "12345"
     * // [abc]{1,3} // matches "a", "ab", "abc" in "abcde"
     * ```
     *
     * @param {number} n - The minimum number of occurrences
     * @param {number} m - The maximum number of occurrences
     * @returns {QuantifierType} The quantifier pattern
     */
    public static between(n: number, m: number): QuantifierType {
        return `{${n},${m}}`;
    }

    /**
     * Creates a quantifier that matches zero or more occurrences
     *
     * ```ts
     * import { Quantifiers } from "@ph/regexp";
     * console.log(Quantifiers.zeroOrMore()); // Output: *
     * console.log(Quantifiers.zeroOrMore(true)); // Output: *?
     * // \d* // matches "", "1", "12", "123" in "123"
     * ```
     *
     * @param {boolean} lazy - If true, makes the quantifier lazy (matches minimum possible)
     * @returns {QuantifierType} The quantifier pattern
     */
    public static zeroOrMore(lazy: boolean = false): QuantifierType {
        return lazy ? "*?" : "*";
    }

    /**
     * Creates a quantifier that matches one or more occurrences
     *
     * ```ts
     * import { Quantifiers } from "@ph/regexp";
     * console.log(Quantifiers.oneOrMore()); // Output: +
     * console.log(Quantifiers.oneOrMore(true)); // Output: +?
     * // \d+ // matches "1", "12", "123" but not "" in "123"
     * ```
     *
     * @param {boolean} lazy - If true, makes the quantifier lazy (matches minimum possible)
     * @returns {QuantifierType} The quantifier pattern
     */
    public static oneOrMore(lazy: boolean = false): QuantifierType {
        return lazy ? "+?" : "+";
    }

    /**
     * Creates a quantifier that matches zero or one occurrence
     *
     * ```ts
     * import { Quantifiers } from "@ph/regexp";
     * console.log(Quantifiers.zeroOrOne()); // Output: ?
     * console.log(Quantifiers.zeroOrOne(true)); // Output: ??
     * // colou?r // matches "color" or "colour"
     * ```
     *
     * @param {boolean} lazy - If true, makes the quantifier lazy (matches minimum possible)
     * @returns {QuantifierType} The quantifier pattern
     */
    public static zeroOrOne(lazy: boolean = false): QuantifierType {
        return lazy ? "??" : "?";
    }
}
