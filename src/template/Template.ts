/**
 * Represents a key that can be used in placeholders.
 */
export type Key = string | number;

/**
 * A function that can modify template values during rendering.
 */
export type CallableValue = (value: string) => string;

/**
 * Represents possible values that can be used in template placeholders.
 */
export type Value = string | number | boolean | null | CallableValue;

/**
 * Internal type for storing template placeholders and their values.
 */
export type Placeholders = Map<Key, Value>;

/**
 * A lightweight and flexible template engine for string interpolation with support for modifiers.
 *
 * @example
 * ```ts
 * import { Template } from "@ph/template";
 *
 * // Basic usage
 * let template = Template.create(`\
 * Hello {{name}}!
 * {{question}}\
 * `)
 *     .set("name", "World")
 *     .set("question", "How are you?");
 *
 * console.log(template.render()); // Output: Hello World!\nHow are you?
 *
 * // Using modifiers
 * const tpl = `\
 * {{name:person1}}: {{person2}}? John is {{red:age}} years old{{repeat:?}}
 * {{name:person2}}: {{green:Yes}} {{person1}}, John is {{red:age}} years old.
 * `;
 *
 * template = Template.create(tpl)
 *     .set("person1", "Jamie")
 *     .set("person2", "Dorian");
 *
 * function name(value: string): string {
 *     return `\x1b[4;10m${value.toUpperCase()}\x1b[0m`;
 * }
 *
 * template.set("name", name)
 *     .set("red", (value: string) => `\x1b[1;31m${value}\x1b[0m`)
 *     .set("green", (value: string) => `\x1b[32m${value}\x1b[0m`)
 *     .set("age", 30);
 *
 * template.set("repeat", (value: string) => value.repeat(2));
 *
 * const result = template.render();
 * console.log(result); // Output: Jamie: Yes Dorian, John is 30 years old?\nDorian: Yes Jamie, John is 30 years old.
 *
 * ```
 */
export class Template {
    private readonly placeholders: Placeholders;
    private readonly template: string;

    private constructor(template: string) {
        this.placeholders = new Map();
        this.template = template;
    }

    /**
     * Creates a new Template instance.
     *
     * @param {string} template - The template string containing placeholders
     * @returns {Template} A new Template instance
     */
    public static create(template: string): Template {
        return new Template(template);
    }

    /**
     * Sets a value for a placeholder or modifier.
     *
     * @param {Key} key - The key to set
     * @param {Value} value - The value to associate with the key
     * @returns {this} The Template instance for chaining
     */
    public set(key: Key, value: Value): this {
        this.placeholders.set(key, value);

        return this;
    }

    /**
     * Renders the template by replacing all placeholders with their values
     * and applying any modifiers.
     *
     * @returns {string} The rendered string
     */
    public render(): string {
        let result = this.template;

        const regex = /{{([a-zA-Z0-9_]+):?([^}]*)}}/;
        const captures = result.match(new RegExp(regex, "g"));

        if (!captures) {
            return result;
        }

        for (const capture of captures) {
            const parts = capture.replaceAll("{{", "").replaceAll("}}", "").split(":");
            const modKey = parts[0];
            const valKey = parts[1];

            let formattedValue: string;

            if (!valKey) {
                formattedValue = this.formatValue(this.placeholders.get(modKey)) ??
                    modKey;
            } else {
                formattedValue = this.formatValue(this.placeholders.get(valKey)) ??
                    valKey;
                const storedValue = this.placeholders.get(modKey);
                if (typeof storedValue === "function") {
                    formattedValue = storedValue(formattedValue);
                }
            }

            result = result.replace(capture, formattedValue);
        }

        return result;
    }

    /**
     * Formats a value to a string.
     *
     * @param {Value | undefined} value - The value to format
     * @returns {string | null} The formatted string or null if the value is null
     */
    private formatValue(value: Value | undefined): string | null {
        if (value === null) {
            return "NULL";
        }

        let finalValue: string | null;

        switch (typeof value) {
            case "number":
                finalValue = value.toString();
                break;
            case "string":
                finalValue = value;
                break;
            case "boolean":
                finalValue = value ? "true" : "false";
                break;
            case "function":
                finalValue = null;
                break;
            default:
                finalValue = null;
        }

        return finalValue;
    }
}
