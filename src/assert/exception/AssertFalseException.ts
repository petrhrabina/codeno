export class AssertFalseException extends Error {
	constructor(message: string, options?: ErrorOptions) {
	  super(message, options);
	  this.name = "AssertFalseException";
	}
  }
  