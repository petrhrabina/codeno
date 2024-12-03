import { ExtensionContext } from "@vscode";

export function activate(context: ExtensionContext) {
    console.log("Codeno activated");
    console.log(context);
}

activate({} as ExtensionContext);
