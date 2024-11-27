import { Template } from "./mod.ts";
import { Assert } from "@ph/assert";

Deno.test("Basic usage", () => {
    const template = Template.create(`Hello {{name}}!`).set("name", "World");

    Assert.same(template.render(), "Hello World!");
});

Deno.test("Wrong usage", () => {
    const template = Template.create(`Hello {{name}}!`);

    Assert.same(template.render(), "Hello name!");
});

Deno.test("Using modifiers", () => {
    const tpl = `\
{{name:person1}}: {{person2}}? John is {{red:age}} years old{{repeat:?}}
{{name:person2}}: {{green:Yes}} {{person1}}, John is {{red:age}} years old.\
`;

    const template = Template.create(tpl)
        .set("person1", "Jamie")
        .set("person2", "Dorian");

    const ESC = "\u001B";

    function name(value: string): string {
        return `${ESC}[4;10m${value.toUpperCase()}${ESC}[0m`;
    }

    template.set("name", name)
        .set("red", (value: string) => `${ESC}[1;31m${value}${ESC}[0m`)
        .set("green", (value: string) => `${ESC}[32m${value}${ESC}[0m`)
        .set("age", 30);

    template.set("repeat", (value: string) => value.repeat(2));

    const expected =
        `${ESC}[4;10mJAMIE${ESC}[0m: Dorian? John is ${ESC}[1;31m30${ESC}[0m years old??\n${ESC}[4;10mDORIAN${ESC}[0m: ${ESC}[32mYes${ESC}[0m Jamie, John is ${ESC}[1;31m30${ESC}[0m years old.`;

    Assert.same(template.render(), expected);
});

Deno.test("Empty template with no placeholders", () => {
    const template = Template.create("Hello World!");
    Assert.same(template.render(), "Hello World!");
});

Deno.test("Template with invalid placeholder format", () => {
    const template = Template.create("Hello {{name}} and {{}}!");
    template.set("name", "World");
    Assert.same(template.render(), "Hello World and {{}}!");
});

Deno.test("Different value types", () => {
    const template = Template.create(`\
{{string}}
{{number}}
{{boolean_true}}
{{boolean_false}}
{{null_value}}
{{function_value:function_value}}
`);

    template
        .set("string", "text")
        .set("number", 42)
        .set("boolean_true", true)
        .set("boolean_false", false)
        .set("null_value", null)
        .set("function_value", (value: string) => value);

    const expected = `\
text
42
true
false
NULL
function_value
`;

    Assert.same(template.render(), expected);
});

Deno.test("Undefined placeholder value", () => {
    const template = Template.create("Value: {{undefined_value}}");
    Assert.same(template.render(), "Value: undefined_value");
});

Deno.test("Template with invalid regex match", () => {
    // Creating a template with a placeholder that will pass the global regex
    // but fail the non-global regex match
    const template = Template.create("Hello {{name}} and {{}}!");
    template.set("name", "World");

    // The {{}} placeholder will be captured by captures = result.match(new RegExp(regex, "g"))
    // but will fail at match = capture.match(regex) because it doesn't have the required groups
    Assert.same(template.render(), "Hello World and {{}}!");
});

Deno.test("Template with malformed placeholder that fails regex match", () => {
    // Creating a template with a malformed placeholder that will pass the global regex
    // but fail the group match
    const template = Template.create("Hello {{name}} and {{*}}!");
    template.set("name", "World");

    Assert.same(template.render(), "Hello World and {{*}}!");
});
