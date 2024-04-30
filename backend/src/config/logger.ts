import pino from "pino";

export default pino({
  transport: {
    target: "pino-pretty"
  }
});
export const apiLogger = (message: string, ...rest: string[]) => {
  console.log(`[API] ${message}`, ...rest);
};
