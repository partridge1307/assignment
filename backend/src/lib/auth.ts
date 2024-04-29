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
    })

  return jwt.sign(payload, Bun.env.JWT__SECRET!, {
    expiresIn,
  });
};

export const verifyToken = (type: keyof typeof TokenEnum, token: string, ignoreExpiration = false) => {
  if (type === TokenEnum.ACCESS)
    return jwt.verify(token, Bun.env.JWT__SECRET!, {
      ignoreExpiration,
    }) as JSONObject;

  return jwt.verify(token, Bun.env.JWT__SECRET!) as JSONObject;
};
