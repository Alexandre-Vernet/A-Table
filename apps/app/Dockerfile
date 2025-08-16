FROM node:alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

RUN npm run build:app


FROM nginx:alpine

COPY apps/app/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist/apps/app/browser /usr/share/nginx/html

EXPOSE 80
