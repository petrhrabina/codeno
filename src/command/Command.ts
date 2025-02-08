import Assert from "jsr:@ph/assert";

/**
 * @example
 * ```ts
 * import Command from "@ph/command";
 * import { assert } from "jsr:@std/assert";
 *
 * const ls = new Command("ls", {
 *     args: ["-la", "--color=always"],
 * });
 *
 * const dump = ls.dump();
 *
 * assert(dump.command === "ls");
 * assert(dump.options?.args?.length === 2);
 * assert(dump.options?.args?.[0] === "-la");
 * assert(dump.options?.args?.[1] === "--color=always");
 *
 * const output = await ls.execute();
 *
 * assert(output.stdout !== undefined);
 * assert(output.stdout.length > 0);
 * assert(output.stderr !== undefined);
 * assert(output.stderr.length === 0);
 * assert(output.code === 0);
 * assert(output.signal === null);
 * assert(output.success === true);
 * ```
 *
 * A class for executing shell commands with flexible output handling.
 * Provides methods for both piped and inherited output modes.
 */
export default class Command {
    private readonly denoCommand: Deno.Command;
    private readonly command: string;
    private readonly options?: Deno.CommandOptions;
    private readonly decorator: TextDecoder;

    public constructor(
        command: string,
        options?: Deno.CommandOptions,
    ) {
        Assert.true(command.length > 0);

        this.denoCommand = new Deno.Command(command, options);
        this.command = command;
        this.options = options;
        this.decorator = new TextDecoder("utf-8");
    }

    public dump() {
        return {
            command: this.command,
            options: this.options,
        };
    }

    public async execute(): Promise<{
        stdout: string | undefined;
        stderr: string | undefined;
        code: number;
        signal: Deno.Signal | null;
        success: boolean;
    }> {
        const output = await this.denoCommand.output();

        return {
            stdout: this.options?.stdout === "inherit" ||
                    this.options?.stdout === "null"
                ? undefined
                : this.decorator.decode(output.stdout),
            stderr: this.options?.stderr === "inherit" ||
                    this.options?.stderr === "null"
                ? undefined
                : this.decorator.decode(output.stderr),
            code: output.code,
            signal: output.signal,
            success: output.success,
        };
    }
}
