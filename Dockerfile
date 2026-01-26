FROM node:lts-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm i typescript -g

COPY . .

RUN npm run build

FROM node:lts-alpine

WORKDIR /todo

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json

EXPOSE 8000

CMD [ "npm", "run", "backend:start" ]