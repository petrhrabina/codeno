export class AssertDefinedException extends Error {
	constructor(message: string, options?: ErrorOptions) {
	  super(message, options);
	  this.name = "AssertDefinedException";
	}
  }
  