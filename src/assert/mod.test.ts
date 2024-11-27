import Assert from "./mod.ts";
import { assertThrows } from "jsr:@std/assert";

Deno.test("same", () => {
    assertThrows(() => Assert.same(1, 2));
});

Deno.test("sameArray", () => {
    assertThrows(() => Assert.sameArray([1, 2], [1, 3]));
    assertThrows(() => Assert.sameArray([1, 2], [2, 1]));
});

Deno.test("true", () => {
    assertThrows(() => Assert.true(false));
});

Deno.test("false", () => {
    assertThrows(() => Assert.false(true));
});

Deno.test("matchRegexp", () => {
    assertThrows(() => Assert.matchRegexp(/\d+/, "abc"));
});

Deno.test("notMatchRegexp", () => {
    assertThrows(() => Assert.notMatchRegexp(/\d+/, "123"));
});
