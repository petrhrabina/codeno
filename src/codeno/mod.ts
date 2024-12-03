import { ExtensionContext } from "./mod.d.ts";

export function activate(context: ExtensionContext) {
    console.log("Codeno activated");
    console.log(context);
}

activate({} as ExtensionContext);
