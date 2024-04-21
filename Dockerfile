FROM node:21-alpine3.18

WORKDIR /app

COPY package.json package-lock.json node_modules .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8002

CMD ["npm","run", "start:prod"]

