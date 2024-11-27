import { PrinterBuilder } from "./mod.ts";
import { Reflection } from "@ph/reflection";
import { Assert } from "@ph/assert";

Deno.test("Simple printer without any modifications", () => {
    const printer = PrinterBuilder
        .create()
        .build();

    Assert.same(
        Reflection.of(printer).getPropertyValue("method"),
        console.log,
    );

    Assert.same(
        Reflection.of(printer).getPropertyValue("fgRgbColor"),
        undefined,
    );

    Assert.same(
        Reflection.of(printer).getPropertyValue("bgRgbColor"),
        undefined,
    );

    Assert.same(
        Reflection.of(printer).getPropertyValue("bold"),
        false,
    );

    Assert.same(
        Reflection.of(printer).getPropertyValue("underline"),
        false,
    );

    Assert.same(
        Reflection.of(printer).getPropertyValue("separator"),
        ", ",
    );
});

Deno.test("Printer with all options", () => {
    const printer = PrinterBuilder
        .create()
        .bold
        .underline
        .foreground({ r: 255, g: 0, b: 0 })
        .background({ r: 0, g: 255, b: 0 })
        .separator(" - ")
        .build();

    Assert.same(
        Reflection.of(printer).getPropertyValue("bold"),
        true,
    );

    Assert.same(
        Reflection.of(printer).getPropertyValue("underline"),
        true,
    );

    Assert.same(
        Reflection.of(printer).getPropertyValue("fgRgbColor"),
        {
            r: 255,
            g: 0,
            b: 0,
        },
    );

    Assert.same(
        Reflection.of(printer).getPropertyValue("bgRgbColor"),
        {
            r: 0,
            g: 255,
            b: 0,
        },
    );

    Assert.same(
        Reflection.of(printer).getPropertyValue("separator"),
        " - ",
    );
});
