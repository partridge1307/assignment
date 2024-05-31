FROM oven/bun:1.1.9

WORKDIR /front-end

COPY package.json ./
COPY bun.lockb ./
COPY . .

RUN bun install
EXPOSE 3000

CMD [ "bun", "run", "dev" ]
