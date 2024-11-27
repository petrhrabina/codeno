import Reflection from "./mod.ts";
import Assert from "@ph/assert";

Deno.test("Simple reflection", () => {
    class MyClass {
        private static name: string;
        public readonly age: number;

        constructor(name: string, age: number) {
            MyClass.name = name;
            this.age = age;
        }

        public static getName(): string {
            return MyClass.name;
        }
    }

    const myClass = new MyClass("John", 30);

    const target = Reflection.of(myClass);

    Assert.same(target.getPropertyValue("name"), "John");
    Assert.same(target.getPropertyValue("name"), target.getPropertyValue("name"));
    Assert.same(target.getPropertyValue("age"), 30);
});

Deno.test("Reflection with static property", () => {
    class MyClass {
        private static name: string;
        private age: number;

        constructor(name: string, age: number) {
            MyClass.name = name;
            this.age = age;
        }

        public static setName(name: string): void {
            MyClass.name = name;
        }

        public setAge(age: number): void {
            this.age = age;
        }
    }

    const myClass = new MyClass("John", 30);

    myClass.setAge(31);
    MyClass.setName("Jane");

    const target = Reflection.of(myClass);

    Assert.same(target.getPropertyValue("name"), "Jane");
    Assert.same(target.getPropertyValue("age"), 31);
});
