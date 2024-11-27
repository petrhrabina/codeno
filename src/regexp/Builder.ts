import type { QuantifierType } from "./Quantifiers.ts";

/**
 * Type representing a compiled regular expression
 */
export type Rule = RegExp;

/**
 * Interface for building regular expressions
 */
export interface BuilderInterface {
    quantifier(quantifier: QuantifierType): BuilderInterface;
    add(...values: string[]): BuilderInterface;
    build(flags?: string): Rule;
}

/**
 * Builder class for constructing regular expressions
 */
export class Builder implements BuilderInterface {
    private rules: string[] = [];

    private constructor() {}

    /**
     * Adds values to the internal rules array
     *
     * @param {string[]} values - Values to be added
     */
    private push(...values: string[]): void {
        this.rules.push(...values);
    }

    /**
     * Creates a new Builder instance with initial values
     *
     * ```ts
     * import { Builder } from "@ph/regexp";
     * const builder = Builder.of("a", "b"); // Creates builder with initial values 'a' and 'b'
     * ```
     *
     * @param {string[]} values - Initial values to add to the builder
     * @returns {BuilderInterface} New builder instance with added values
     */
    public static of(...values: string[]): BuilderInterface {
        const builder = new Builder();

        return builder.add(...values);
    }

    /**
     * Adds one or more values to the builder
     * If multiple values are provided, they are joined with OR operator (|)
     *
     * ```ts
     * import { Builder } from "@ph/regexp";
     * const builder = Builder.of("a", "b");
     * builder.add('a');        // Adds 'a'
     * builder.add('a', 'b');   // Adds '(a|b)'
     * ```
     *
     * @param {string[]} values - Values to add to the builder
     * @returns {BuilderInterface} Builder instance for method chaining
     */
    public add(...values: string[]): BuilderInterface {
        let final: string;

        if (values.length === 1) {
            final = values[0];
        } else {
            final = `(${values.join("|")})`;
        }

        this.push(final);

        return this;
    }

    /**
     * Adds a quantifier to the last added value
     *
     * ```ts
     * import { Builder } from "@ph/regexp";
     * const builder = Builder.of("a", "b");
     * builder.add('a').quantifier('*');  // Matches 'a' zero or more times
     * builder.add('b').quantifier('+');  // Matches 'b' one or more times
     * ```
     *
     * @param {QuantifierType} quantifier - Quantifier to add
     * @returns {BuilderInterface} Builder instance for method chaining
     */
    public quantifier(quantifier: QuantifierType): BuilderInterface {
        this.push(quantifier);

        return this;
    }

    /**
     * Builds and returns the final regular expression
     *
     * ```ts
     * import { Builder } from "@ph/regexp";
     * const builder = Builder.of("a", "b");
     * let regex = builder.build('g');     // Returns RegExp with global flag
     * regex = builder.build();        // Returns RegExp without flags
     * ```
     *
     * @param {string} [flags] - Optional flags for the regular expression
     * @returns {Rule} Compiled regular expression
     */
    public build(flags?: string): Rule {
        let final: string = "";

        this.rules.forEach((rule) => {
            final += rule;
        });

        return new RegExp(final, flags);
    }
}
