FROM node:alpine AS build

WORKDIR /app

COPY app/package*.json ./

RUN npm install --production

COPY app/. .

RUN npm run build


FROM nginx:alpine

COPY app/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist/a-table/browser /usr/share/nginx/html

EXPOSE 80
