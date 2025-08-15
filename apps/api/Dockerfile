FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --include=optional

COPY . .

RUN npm run build:api

CMD ["node", "dist/apps/api/main.js"]
