// Assert
import Assert from "@ph/assert";
Assert.sameArray([1, 2, 3], [1, 2, 3]);

// Pipeline
import Pipeline, { DataPoolMock, JobMock } from "@ph/pipeline";
const dataPool = DataPoolMock.getInstance();

await new Pipeline([
    new JobMock(dataPool, "A", 50),
    new JobMock(dataPool, "B", 50),
]).sequence();

// Printer
import PrinterBuilder from "@ph/printer";
const printer = PrinterBuilder.create().build();
printer("Hello", "World");

// Reflection
import Reflection from "@ph/reflection";
class MyClass {
    private static name: string;
    public age: number;

    constructor(name: string, age: number) {
        MyClass.name = name;
        this.age = age;
    }
}
const myClass = new MyClass("John", 30);
const target = Reflection.of(myClass);
console.log(target.getPropertyValue("name"));

// Regexp
import Builder from "@ph/regexp";
const builder = Builder.of("a", "b");
console.log(builder);

// Template
import Template from "@ph/template";

// Basic usage
const template = Template.create(`\
Hello {{name}}!
{{question}}\
`)
    .set("name", "World")
    .set("question", "How are you?");

console.log(template.render());
