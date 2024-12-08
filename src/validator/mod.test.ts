import { Validator } from "./mod.ts";
import { Assert } from "@ph/assert";

Deno.test("Non-empty string validator", () => {
    const validator = Validator.create((value: string) => value.length > 0);
    Assert.true(validator.validate("test"));
    Assert.false(validator.validate(""));
});

Deno.test("Email validator", () => {
    const validator = Validator.create((value: string) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    );
    Assert.true(validator.validate("test@example.com"));
    Assert.false(validator.validate("invalid-email"));
});

Deno.test("Strong password validator", () => {
    const validator = Validator.create((value: string) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(value)
    );
    Assert.true(validator.validate("Password123"));
    Assert.false(validator.validate("weak"));
});

Deno.test("URL validator", () => {
    const validator = Validator.create((value: string) => {
        try {
            new URL(value);
            return true;
        } catch {
            return false;
        }
    });
    Assert.true(validator.validate("https://example.com"));
    Assert.false(validator.validate("invalid-url"));
});

Deno.test("Numeric string validator", () => {
    const validator = Validator.create((value: string) => /^\d+$/.test(value));
    Assert.true(validator.validate("123"));
    Assert.false(validator.validate("abc"));
});

Deno.test("Date string validator", () => {
    const validator = Validator.create((value: string) => !isNaN(Date.parse(value)));
    Assert.true(validator.validate("2023-12-08"));
    Assert.false(validator.validate("invalid-date"));
});

Deno.test("Undefined result validator", () => {
    const validator = Validator.create(() => undefined);
    Assert.false(validator.validate("test"));
});
