import {
    type Callable,
    type ColorType,
    type Method,
    PrinterConstructor,
    type PrinterOptions,
} from "./PrinterConstructor.ts";

/**
 * Function signature for the built printer instance
 */
interface Printer extends Callable {}

/**
 * Builder class for creating customized Printer instances
 *
 * Provides a fluent interface for configuring printer options including styling,
 * colors, and output behavior.
 *
 * @example Basic usage
 * ```ts
 * const printer = PrinterBuilder.create().build();
 * printer('Hello', 'World'); // Outputs: Hello, World
 * ```
 *
 * @example Styled printer
 * ```ts
 * const styledPrinter = PrinterBuilder.create()
 *   .bold
 *   .underline
 *   .foreground({ r: 255, g: 193, b: 37 })
 *   .separator(' -> ')
 *   .build();
 *
 * styledPrinter('Step 1', 'Step 2', 'Step 3'); // Outputs: Step 1 -> Step 2 -> Step 3
 * ```
 */
export default class PrinterBuilder {
    private options: PrinterOptions = {};

    private constructor() {
        // Create a proxy that will allow the builder to be called as a function
        // return new Proxy(this, {
        //     apply: (target, _, args) => {
        //         return target.build()(...args);
        //     },
        // });
    }

    /**
     * Creates a new PrinterBuilder instance
     * @returns A new PrinterBuilder for chaining configuration
     *
     * @example
     * ```ts
     * const builder = PrinterBuilder.create();
     * ```
     */
    public static create(): PrinterBuilder {
        return new PrinterBuilder() as PrinterBuilder;
    }

    /**
     * Enables bold text styling
     * @returns The builder instance for chaining
     *
     * @example
     * ```ts
     * const printer = PrinterBuilder.create()
     *   .bold
     *   .build();
     * ```
     */
    public get bold(): PrinterBuilder {
        this.options.bold = true;
        return this;
    }

    /**
     * Enables text underlining
     * @returns The builder instance for chaining
     *
     * @example
     * ```ts
     * const printer = PrinterBuilder.create()
     *   .underline
     *   .build();
     * ```
     */
    public get underline(): PrinterBuilder {
        this.options.underline = true;
        return this;
    }

    /**
     * Sets the separator used between text segments
     * @param separator - String to use between text segments
     * @returns The builder instance for chaining
     *
     * @example
     * ```ts
     * const printer = PrinterBuilder.create()
     *   .separator(' | ')
     *   .build();
     * printer('A', 'B', 'C'); // Outputs: A | B | C
     * ```
     */
    public separator(separator: string): PrinterBuilder {
        this.options.separator = separator;
        return this;
    }

    /**
     * Sets a custom output method
     * @param method - Function to handle the final formatted output
     * @returns The builder instance for chaining
     *
     * @example
     * ```ts
     * const printer = PrinterBuilder.create()
     *   .method((text) => console.error(text))
     *   .build();
     * ```
     */
    public method(method: Method): PrinterBuilder {
        this.options.method = method;
        return this;
    }

    /**
     * Sets the foreground (text) color using RGB values
     * @param color - RGB color configuration
     * @returns The builder instance for chaining
     *
     * @example
     * ```ts
     * const printer = PrinterBuilder.create()
     *   .foreground({ r: 255, g: 0, b: 0 }) // Red text
     *   .build();
     * ```
     */
    public foreground({
        r,
        g,
        b,
    }: ColorType): PrinterBuilder {
        this.options.fgRgbColor = { r, g, b };
        return this;
    }

    /**
     * Sets the background color using RGB values
     * @param color - RGB color configuration
     * @returns The builder instance for chaining
     *
     * @example
     * ```ts
     * const printer = PrinterBuilder.create()
     *   .background({ r: 255, g: 255, b: 0 }) // Yellow background
     *   .build();
     * ```
     */
    public background({
        r,
        g,
        b,
    }: ColorType): PrinterBuilder {
        this.options.bgRgbColor = { r, g, b };
        return this;
    }

    /**
     * Builds and returns the configured Printer instance
     * @returns A callable Printer instance with the configured options
     *
     * @example
     * ```ts
     * const printer = PrinterBuilder.create()
     *   .bold
     *   .foreground({ r: 0, g: 255, b: 0 })
     *   .build();
     *
     * printer('Success!');
     * ```
     */
    public build(): Printer {
        return PrinterConstructor.construct(this.options);
    }
}
