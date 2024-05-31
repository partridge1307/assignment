FROM oven/bun:1.1.9

WORKDIR /back-end

COPY package.json ./
COPY bun.lockb ./
COPY . .

RUN bun install
EXPOSE 8000

CMD [ "bun", "run", "dev" ]
