import { colors } from "jsr:@cliffy/ansi@^1.0.0-rc.7/colors";

export enum StdType {
    Piped = "piped",
    Inherit = "inherit",
    Null = "null",
}

export type PipeResult = {
    success: boolean;
    output: string;
    error: string;
};
export class Command {
    public static async pipe(command: string, ...args: string[]): Promise<PipeResult> {
        const output = await (new Deno.Command(
            command,
            {
                args: args,
                stdout: StdType.Piped,
                stderr: StdType.Piped,
            },
        )).output();

        const decodedOutput = new TextDecoder().decode(output.stdout);
        const decodedError = new TextDecoder().decode(output.stderr);

        return {
            success: output.success,
            output: decodedOutput,
            error: decodedError,
        };
    }

    public static async inherit(command: string, ...args: string[]): Promise<void> {
        await (new Deno.Command(
            command,
            {
                args: args,
                stdout: StdType.Inherit,
                stderr: StdType.Inherit,
            },
        )).output();
    }

    public static async getContainerId(): Promise<string> {
        const result = await Command.pipe(
            "docker",
            "ps",
            "-q",
            "-f",
            "name=favi_app",
        );
        if (!result.success) {
            console.error(colors.bold.underline.red(`🚨 ${result.error.toString()}`));
        }
        return result.output.trim();
    }

    public static async pipeInContainer(
        command: string,
        beforeDump?: () => void,
    ): Promise<void> {
        const result = await Command.pipe(
            "docker",
            "exec",
            await Command.getContainerId(),
            "sh",
            "-c",
            command,
        );

        if (beforeDump) {
            beforeDump();
        }

        if (!result.success) {
            console.log(colors.bold.red(`${result.output.toString()}`));
            console.log(colors.bold.red(`${result.error.toString()}`));
        } else {
            console.log(colors.dim(`${result.output.toString()}`));
        }
    }

    public static async pipeFromContainer(command: string): Promise<PipeResult> {
        return await Command.pipe(
            "docker",
            "exec",
            await Command.getContainerId(),
            "sh",
            "-c",
            command,
        );
    }

    public static async inheritInContainer(command: string): Promise<void> {
        await Command.inherit(
            "docker",
            "exec",
            await Command.getContainerId(),
            "sh",
            "-c",
            command,
        );
    }

    public static async pipeInWorkingDirectory(command: string): Promise<void> {
        const result = await Command.pipe(
            "sh",
            "-c",
            command,
        );

        if (!result.success) {
            console.log(colors.bold.red(`${result.output.toString()}`));
            console.log(colors.bold.red(`${result.error.toString()}`));
        } else {
            console.log(colors.dim(`${result.output.toString()}`));
        }
    }

    public static async pipeFromWorkingDirectory(command: string): Promise<PipeResult> {
        const result = await Command.pipe(
            "sh",
            "-c",
            command,
        );

        if (!result.success) {
            console.log(colors.bold.red(`${result.output.toString()}`));
            console.log(colors.bold.red(`${result.error.toString()}`));
        }

        return result;
    }
}
