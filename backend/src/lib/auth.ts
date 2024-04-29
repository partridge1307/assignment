import type { JSONObject } from "hono/utils/types";
import jwt from "jsonwebtoken";

export const TokenEnum = {
  ACCESS: 'ACCESS',
  REFRESH: 'REFRESH'
};

export const generateToken = (type: keyof typeof TokenEnum, payload: JSONObject, expiresIn: string) => {
  if (type === TokenEnum.ACCESS)
    return jwt.sign(payload, Bun.env.JWT__SECRET!, {
      expiresIn,
      notBefore: Date.now(),
    })

  return jwt.sign(payload, Bun.env.JWT__SECRET!, {
    expiresIn,
    notBefore: Date.now(),
  });
};
