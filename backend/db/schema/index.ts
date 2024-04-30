import * as userSchema from "./users";
import * as bookSchema from "./books";
import * as cartSchema from "./carts";
import * as historySchema from "./histories";

export const schema = { ...userSchema, ...bookSchema, ...cartSchema, ...historySchema };

