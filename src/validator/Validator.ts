export type ValidationResult = boolean | void;

/**
 * Interface representing a validation method.
 * @interface
 */
export interface Method {
    /**
     * Validates a given string value.
     * @param {string} value - The value to validate.
     * @returns {boolean} - Returns true if the value is valid, otherwise false.
     */
    (value: string): ValidationResult;
}

/**
 * Class representing a Validator.
 *
 * @example
 * ```ts
 * import { Validator, Method } from "@ph/validator";
 * const isNonEmptyString: Method = (value) => value.length > 0;
 * const validator = Validator.create(isNonEmptyString);
 * console.log(validator.validate("test")); // true
 * console.log(validator.validate("")); // false
 * ```
 */
export class Validator {
    private readonly method: Method;

    /**
     * Creates an instance of Validator.
     * @private
     * @param {Method} method - The validation method to use.
     */
    private constructor(
        method: Method,
    ) {
        this.method = method;
    }

    /**
     * Static method to create a Validator instance.
     *
     * @param {Method} method - The validation method to use.
     * @returns {Validator} - A new Validator instance.
     *
     * @example
     * ```ts
     * import { Validator } from "@ph/validator";
     * const validator = Validator.create((value) => value.length > 0);
     * ```
     */
    public static create(
        method: Method,
    ): Validator {
        return new Validator(method);
    }

    /**
     * Validates a given string value using the provided method.
     * @param {string} value - The value to validate.
     * @returns {boolean} - Returns true if the value is valid, otherwise false.
     *
     * @example
     * ```ts
     * import { Validator } from "@ph/validator";
     * const validator = Validator.create((value) => value.length > 0);
     * console.log(validator.validate("test")); // true
     * console.log(validator.validate("")); // false
     * ```
     */
    public validate(value: string): boolean {
        const result = this.method(value);
        return result === undefined ? false : Boolean(result);
    }
}
