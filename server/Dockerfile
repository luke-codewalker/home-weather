FROM node:alpine as setup

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

FROM node:alpine as production

WORKDIR /app

COPY --from=setup /app ./

ENV NODE_ENV=production

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]