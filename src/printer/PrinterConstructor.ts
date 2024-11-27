import { bgRgb24, bold, rgb24, underline } from "jsr:@std/fmt@~1.0/colors";

/**
 * Represents an RGB color configuration
 */
export type ColorType = {
    /** Red component (0-255) */
    r: number;
    /** Green component (0-255) */
    g: number;
    /** Blue component (0-255) */
    b: number;
};

/**
 * Custom method for text output*
 */
export type Method = (...text: string[]) => void;

/**
 * Configuration options for the Printer instance
 */
export type PrinterOptions = {
    /** Custom output method (defaults to console.log) */
    method?: Method;
    /** Foreground RGB color configuration */
    fgRgbColor?: ColorType;
    /** Background RGB color configuration */
    bgRgbColor?: ColorType;
    /** Enable bold text styling */
    bold?: boolean;
    /** Enable text underlining */
    underline?: boolean;
    /** Custom separator for joining multiple text segments (defaults to ', ') */
    separator?: string;
};

/**
 * Function signature for the printer instance
 */
export interface Callable {
    (...text: string[]): void;
}

/**
 * A flexible text styling and printing utility for terminal output
 *
 * This class provides a way to create customized text printers with various styling options
 * including colors, bold text, underlining, and custom separators.
 *
 * @example
 * ```ts
 * import { PrinterConstructor } from "@ph/printer";
 *
 * PrinterConstructor.construct()("Hello", "World"); // Output: Hello, World
 *
 * function myMethod(...msg: string[]): void {
 *      console.error(...msg.map((m) => `[${m}]`));
 * }
 *
 * const myPrinter = PrinterConstructor.construct({
 *     method: myMethod,
 *     bold: true,
 *     underline: true,
 *     fgRgbColor: { r: 255, g: 0, b: 0 },
 *     bgRgbColor: { r: 0, g: 0, b: 0 },
 *     separator: " - ",
 * });
 *
 * myPrinter("Hello", "World"); // Output: [Hello - World]
 * ```
 */
export class PrinterConstructor {
    private readonly method: Method;
    private readonly fgRgbColor: ColorType | undefined;
    private readonly bgRgbColor: ColorType | undefined;
    private readonly bold: boolean;
    private readonly underline: boolean;
    private readonly separator: string;

    /**
     * Creates a new Printer instance with the specified options
     *
     * @private Use {@link PrinterConstructor.construct} to create a printer instance
     */
    private constructor(options: PrinterOptions) {
        this.method = options.method ?? console.log;
        this.fgRgbColor = options.fgRgbColor;
        this.bgRgbColor = options.bgRgbColor;
        this.bold = options.bold ?? false;
        this.underline = options.underline ?? false;
        this.separator = options.separator ?? ", ";
    }

    /**
     * Creates a new callable printer instance with the specified options
     *
     * @param {PrinterOptions} options - Configuration options for the printer
     * @returns {Callable} A callable function that prints styled text
     *
     * @example
     * ```ts
     * import { PrinterConstructor } from "@ph/printer";
     *
     * const myPrinter = PrinterConstructor.construct({
     *     bold: true,
     *     separator: " - ",
     * });
     *
     * myPrinter("Hello", "World"); // Output: Hello - World
     * ```
     */
    public static construct(options?: PrinterOptions): Callable {
        const printerConstructor = new PrinterConstructor(options ?? {});

        return Object.assign(
            printerConstructor
                .print
                .bind(printerConstructor),
            printerConstructor,
        );
    }

    /**
     * Prints the provided text segments with applied styling
     *
     * @private Internal method used by the callable instance
     */
    private print(...text: string[]): void {
        const joinedText: string = text.join(this.separator);
        const styledText: string = this.getStyledText(joinedText);

        this.method(styledText);
    }

    /**
     * Applies configured styles to the provided text
     *
     * @private Internal styling helper
     */
    private getStyledText(text: string) {
        let finalStyle = text;

        if (this.bold) {
            finalStyle = bold(finalStyle);
        }

        if (this.underline) {
            finalStyle = underline(finalStyle);
        }

        if (this.fgRgbColor !== undefined) {
            finalStyle = rgb24(finalStyle, this.fgRgbColor);
        }

        if (this.bgRgbColor !== undefined) {
            finalStyle = bgRgb24(finalStyle, this.bgRgbColor);
        }

        return finalStyle;
    }
}
