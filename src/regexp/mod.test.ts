import { Builder, Preset, Quantifiers } from "./mod.ts";
import { Assert } from "@ph/assert";

Deno.test("capture", () => {
    Assert.same(
        Preset.capture("year", "\\d{4}"),
        "(?<year>\\d{4})",
    );
});

Deno.test("Builder - add single value", () => {
    const builder = Builder.of("a");
    const regex = builder.build();
    Assert.same(regex.source, "a");
});

Deno.test("Builder - add multiple values", () => {
    const builder = Builder.of("a", "b");
    const regex = builder.build();
    Assert.same(regex.source, "(a|b)");
});

Deno.test("Builder - add quantifier", () => {
    const builder = Builder.of("a").quantifier(Quantifiers.zeroOrMore(true));
    const regex = builder.build();
    Assert.same(regex.source, "a*?");
});

Deno.test("Builder - build with flags", () => {
    const builder = Builder.of("a", "b", "c").quantifier(Quantifiers.between(1, 3));
    const regex = builder.build("g");
    Assert.same(regex.source, "(a|b|c){1,3}");
    Assert.same(regex.flags, "g");
});
