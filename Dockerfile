FROM node:19

COPY . /app

WORKDIR /app

RUN npm ci

ENTRYPOINT npm run start
