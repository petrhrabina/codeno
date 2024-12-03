/**
 * Enum representing standard I/O types for command execution.
 */
export enum StdType {
    piped = "piped",
    inherit = "inherit",
    null = "null",
}

/**
 * @example
 * ```ts
 * import { Command } from "@ph/command";
 *
 * const ls = new Command("ls", "-la");
 *
 * const output = await ls.pipe();
 * const echo = new Command("echo", output);
 * await echo.inherit();
 * ```
 *
 * A class for executing shell commands with flexible output handling.
 * Provides methods for both piped and inherited output modes.
 */
export class Command {
    private readonly command: string;
    private readonly args: string[];
    private readonly decorator: TextDecoder;

    /**
     * Creates a new Command instance.
     *
     * @example
     * ```ts
     * import { Command } from "@ph/command";
     * const ls = new Command("ls", "-la");
     * ```
     *
     * @param command The command to execute
     * @param args Additional command arguments
     */
    public constructor(command: string, ...args: string[]) {
        this.command = command;
        this.args = args;
        this.decorator = new TextDecoder("utf-8");
    }

    /**
     * Executes the command and returns its output as a string.
     *
     * @example
     * ```ts
     * import { Command } from "@ph/command";
     * const ls = new Command("ls", "-la");
     * const output = await ls.pipe();
     * console.log(output);
     * ```
     *
     * @returns Promise resolving to the command's stdout output
     * @throws Error if the command execution fails, containing stderr output
     */
    public async pipe(): Promise<string> {
        const process = this.execute(StdType.piped);
        process.stdin?.close();

        const output = await process.output();
        if (output.success) {
            return this.decorator.decode(output.stdout);
        } else {
            throw new Error(this.decorator.decode(output.stderr));
        }
    }

    /**
     * Executes the command with inherited stdio streams.
     *
     * @example
     * ```ts
     * import { Command } from "@ph/command";
     * const echo = new Command("echo", "Hello World");
     * await echo.inherit();
     * ```
     *
     * @returns Promise resolving when the command completes
     * @throws Error if the command execution fails
     */
    public async inherit(): Promise<void> {
        const process = this.execute(StdType.inherit);

        const output = await process.output();
        if (output.success === false) {
            throw new Error(this.decorator.decode(output.stderr));
        }
    }

    /**
     * Returns the command as a string with all its arguments.
     * @returns The complete command string
     */
    public dump(): string {
        return `${this.command} ${this.args.join(" ")}`.trim();
    }

    /**
     * Creates and spawns a new Deno.Command with the specified stdio configuration.
     * @param stdType The type of stdio to use
     * @returns A spawned child process
     * @private
     */
    private execute(stdType: StdType): Deno.ChildProcess {
        return new Deno.Command(
            this.command,
            {
                args: this.args,
                stdin: stdType,
                stdout: stdType,
                stderr: stdType,
            },
        ).spawn();
    }
}
