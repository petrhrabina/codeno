/**
 * Type representing a preset regular expression pattern
 */
export type PresetType = string;

/**
 * Class containing preset regular expression patterns
 */
export class Preset {
    /**
     * Shorthand Character Class: Matches digits (0-9)
     *
     * Matches: "0", "1", "9"
     * Does not match: "a", "@", " "
     *
     * @type {PresetType}
     */
    public static readonly digit: PresetType = "\\d";

    /**
     * Shorthand Character Class: Matches non-digit characters
     *
     * Matches: "a", "@", " "
     * Does not match: "0", "1", "9"
     *
     * @type {PresetType}
     */
    public static readonly nonDigit: PresetType = "\\D";

    /**
     * Shorthand Character Class: Matches word characters (letters, digits, and underscore)
     *
     * Matches: "a", "B", "1", "_"
     * Does not match: "@", " ", "!"
     *
     * @type {PresetType}
     */
    public static readonly word: PresetType = "\\w";

    /**
     * Shorthand Character Class: Matches non-word characters
     *
     * Matches: "@", " ", "!"
     * Does not match: "a", "B", "1", "_"
     *
     * @type {PresetType}
     */
    public static readonly nonWord: PresetType = "\\W";

    /**
     * Shorthand Character Class: Matches whitespace characters
     *
     * Matches: " ", "\t", "\n", "\r"
     * Does not match: "a", "1", "@"
     *
     * @type {PresetType}
     */
    public static readonly whitespace: PresetType = "\\s";

    /**
     * Shorthand Character Class: Matches non-whitespace characters
     *
     * Matches: "a", "1", "@"
     * Does not match: " ", "\t", "\n"
     *
     * @type {PresetType}
     */
    public static readonly nonWhitespace: PresetType = "\\S";

    /**
     * Custom Character Class: Matches unsigned integers
     *
     * Matches: "0", "1", "9"
     * Does not match: "-1", "a", "@"
     *
     * @type {PresetType}
     */
    public static readonly unsigned: PresetType = "[0-9]";

    /**
     * Custom Character Class: Matches Latin letters (both cases)
     *
     * Matches: "a"-"z", "A"-"Z"
     * Does not match: "1", "@", "é"
     *
     * @type {PresetType}
     */
    public static readonly latin: PresetType = "[a-zA-Z]";

    /**
     * Custom Character Class: Matches lowercase Latin letters
     *
     * Matches: "a"-"z"
     * Does not match: "A"-"Z", "1", "@"
     *
     * @type {PresetType}
     */
    public static readonly latinLower: PresetType = "[a-z]";

    /**
     * Custom Character Class: Matches uppercase Latin letters
     *
     * Matches: "A"-"Z"
     * Does not match: "a"-"z", "1", "@"
     *
     * @type {PresetType}
     */
    public static readonly latinUpper: PresetType = "[A-Z]";

    /**
     * Special Character: Matches any character except newline
     *
     * Matches: any character except \n
     * Does not match: \n
     *
     * @type {PresetType}
     */
    public static readonly anyExceptNewLine: PresetType = ".";

    /**
     * Special Character: Matches tab character
     *
     * Matches: \t
     * Does not match: " ", "\n"
     *
     * @type {PresetType}
     */
    public static readonly tab: PresetType = "\\t";

    /**
     * Special Character: Matches newline character
     *
     * Matches: \n
     * Does not match: \r, " "
     *
     * @type {PresetType}
     */
    public static readonly newLine: PresetType = "\\n";

    /**
     * Special Character: Matches carriage return character
     *
     * Matches: \r
     * Does not match: \n, " "
     *
     * @type {PresetType}
     */
    public static readonly carriageReturn: PresetType = "\\r";

    /**
     * Special Character: Matches hexadecimal character
     *
     * Format: \xHH where H is a hex digit
     * Example: \xA9 matches the copyright symbol (©)
     *
     * @type {PresetType}
     */
    public static readonly hexadecimal: PresetType = "\\xAA";

    /**
     * Special Character: Matches UTF-16 character
     *
     * Format: \uHHHH where H is a hex digit
     * Example: \u00A9 matches the copyright symbol (©)
     *
     * @type {PresetType}
     */
    public static readonly utf16: PresetType = "\\uAAAA";

    /**
     * Special Character: Matches Unicode character
     *
     * Format: \u{H...} where H is one or more hex digits
     * Example: \u{1F600} matches the grinning face emoji (😀)
     *
     * @type {PresetType}
     */
    public static readonly unicode: PresetType = "\\u{AAAA}";

    /**
     * Anchor: Matches the start of the string
     *
     * "^hello" matches "hello world" but not "say hello"
     *
     * @type {PresetType}
     */
    public static readonly start: PresetType = "^";

    /**
     * Anchor: Matches the end of the string
     *
     * "world$" matches "hello world" but not "world class"
     *
     * @type {PresetType}
     */
    public static readonly end: PresetType = "$";

    /**
     * Anchor: Matches a word boundary
     *
     * "\bcat\b" matches "the cat sat" but not "category"
     *
     * @type {PresetType}
     */
    public static readonly wordBoundary: PresetType = "\\b";

    /**
     * Anchor: Matches a non-word boundary
     *
     * "\Bcat\B" matches "category" but not "the cat"
     *
     * @type {PresetType}
     */
    public static readonly nonWordBoundary: PresetType = "\\B";

    /**
     * Creates a named capturing group
     *
     * capture('year', '\\d{4}') creates "(?<year>\\d{4})"
     * This will capture 4 digits and name the group 'year'
     *
     * @param {string} name - The name of the capturing group
     * @param {string} pattern - The pattern to be captured
     * @returns {PresetType} The complete capturing group pattern
     */
    public static readonly capture: (
        name: string,
        pattern: string,
    ) => PresetType = (
        name: string,
        pattern: string,
    ) => `(?<${name}>${pattern})`;
}
