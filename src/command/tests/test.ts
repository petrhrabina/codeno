import Command from "../Command.ts";
import { assert } from "jsr:@std/assert";

Deno.test("command", async () => {
    const ls = new Command("ls", {
        args: ["-la", "--color=always"],
    });

    const dump = ls.dump();

    assert(dump.command === "ls");
    assert(dump.options?.args?.length === 2);
    assert(dump.options?.args?.[0] === "-la");
    assert(dump.options?.args?.[1] === "--color=always");

    const output = await ls.execute();

    assert(output.stdout !== undefined);
    assert(output.stdout.length > 0);
    assert(output.stderr !== undefined);
    assert(output.stderr.length === 0);
    assert(output.code === 0);
    assert(output.signal === null);
    assert(output.success === true);
});
