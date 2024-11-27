/**
 * Type representing the target object type
 */
export type Target = typeof Object;

/**
 * Simple reflection utility for getting property values from an object.
 * Supports both instance and static properties.
 *
 * @example
 * ```ts
 * import { Reflection } from '@ph/reflection';
 *
 * class MyClass {
 *     private static name: string;
 *     public age: number;
 *
 *     constructor(name: string, age: number) {
 *         MyClass.name = name;
 *         this.age = age;
 *     }
 * }
 *
 * const myClass = new MyClass("John", 30);
 * const target = Reflection.of(myClass);
 *
 * console.log(target.getPropertyValue("name")); // Output: "John"
 * console.log(target.getPropertyValue("age")); // Output: 30
 * ```
 */
export class Reflection {
    /** The target object to reflect upon */
    private readonly target: Target;

    /**
     * Private constructor to create a new Reflection instance
     * @param target - The target object to reflect upon
     */
    private constructor(target: Target) {
        this.target = target;
    }

    /**
     * Creates a new Reflection instance from the given target object
     * @param target - The target object to reflect upon
     * @returns A new Reflection instance
     */
    public static of(target: object): Reflection {
        const objectFromTarget = Object.create(target);
        return new Reflection(objectFromTarget);
    }

    /**
     * Gets the value of a property from the target object.
     * If the property is not found as an instance property,
     * it attempts to retrieve it as a static property.
     *
     * @template K - The key type extending keyof T
     * @param propertyKey - The property key to get the value for
     * @returns The value of the property with type T[K]
     */
    public getPropertyValue<T>(propertyKey: PropertyKey): T {
        if (Reflect.has(this.target, propertyKey) !== false) {
            return Reflect.get(this.target, propertyKey);
        }

        const constructor = Object.getPrototypeOf(this.target).constructor;

        return Reflect.get(constructor, propertyKey);
    }
}
