export class AssertInstanceOfException extends Error {
	constructor(message: string, options?: ErrorOptions) {
	  super(message, options);
	  this.name = "AssertInstanceOfException";
	}
  }
  