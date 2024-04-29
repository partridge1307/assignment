declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT?: number,
      DB__HOST?: string,
      DB__PORT?: number,
      DB__USER?: string,
      DB__PASS?: string,
      DB__DATABASE?: string
      JWT__SECRET?: string
      WH__URL?: string
    }
  }
}

export { }
