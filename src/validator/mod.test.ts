import { Validator } from "./mod.ts";
import { assert, assertFalse } from "jsr:@std/assert@^1.0";

Deno.test("Non-empty string validator", () => {
    const isNonEmpty = Validator.create((value: string) => value.length > 0);
    assert(isNonEmpty.validate("Hello"));
    assertFalse(isNonEmpty.validate(""));
});

Deno.test("Email validator", () => {
    const isEmail = Validator.create((value: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
    });
    assert(isEmail.validate("user@example.com"));
    assertFalse(isEmail.validate("invalid-email"));
});

Deno.test("Strong password validator", () => {
    const hasMinLength = (value: string) => value.length >= 8;
    const hasNumber = (value: string) => /\d/.test(value);
    const hasSpecialChar = (value: string) => /[!@#$%^&*]/.test(value);

    const isStrongPassword = Validator.create((value: string) =>
        hasMinLength(value) &&
        hasNumber(value) &&
        hasSpecialChar(value)
    );

    assertFalse(isStrongPassword.validate("weak"));
    assert(isStrongPassword.validate("Strong#Pass123"));
});

Deno.test("URL validator", () => {
    const isUrl = Validator.create((value: string) => {
        try {
            new URL(value);
            return true;
        } catch {
            return false;
        }
    });
    assert(isUrl.validate("https://example.com"));
    assertFalse(isUrl.validate("not-a-url"));
});

Deno.test("Numeric string validator", () => {
    const isNumeric = Validator.create((value: string) =>
        !isNaN(Number(value)) && !isNaN(parseFloat(value))
    );
    assert(isNumeric.validate("123"));
    assertFalse(isNumeric.validate("abc"));
});

Deno.test("Date string validator", () => {
    const isValidDate = Validator.create((value: string) => {
        const date = new Date(value);
        return date instanceof Date && !isNaN(date.getTime());
    });
    assert(isValidDate.validate("2023-10-10"));
    assertFalse(isValidDate.validate("not-a-date"));
});
