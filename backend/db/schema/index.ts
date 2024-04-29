import * as userSchema from "./users";
import * as bookSchema from "./books";

export const schema = { ...userSchema, ...bookSchema };

