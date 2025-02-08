export class AssertArrayInstanceOf extends Error {
	constructor(message: string, options?: ErrorOptions) {
	  super(message, options);
	  this.name = "AssertArrayInstanceOf";
	}
  }
  