import { Command } from "./mod.ts";
import { Assert } from "@ph/assert";
import { assert } from "jsr:@std/assert";

Deno.test("pipe", async () => {
    const ls = new Command("ls", "-la");
    const output = await ls.pipe();
    Assert.true(typeof output === "string");
});

Deno.test("pipe should throw on invalid command", async () => {
    const invalid = new Command("nonexistentcommand");
    try {
        await invalid.pipe();
        assert(false, "Should have thrown an error");
    } catch (error) {
        assert(error instanceof Error);
    }
});

Deno.test("pipe should throw on command error", async () => {
    const invalid = new Command("ls", "--invalid-option");
    try {
        await invalid.pipe();
        assert(false, "Should have thrown an error");
    } catch (error) {
        assert(error instanceof Error);
    }
});

Deno.test("inherit should throw on invalid command", async () => {
    const invalid = new Command("nonexistentcommand");
    try {
        await invalid.inherit();
        assert(false, "Should have thrown an error");
    } catch (error) {
        assert(error instanceof Error);
    }
});

Deno.test("inherit should throw on command error", async () => {
    const invalid = new Command("ls", "--invalid-option");
    try {
        await invalid.inherit();
        assert(false, "Should have thrown an error");
    } catch (error) {
        assert(error instanceof Error);
    }
});

Deno.test("dump should return command string", () => {
    const ls = new Command("ls", "-la", "test");
    Assert.true(ls.dump() === "ls -la test");
});
