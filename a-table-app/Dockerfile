FROM node:alpine AS build

WORKDIR /app

COPY a-table-app/package*.json ./

RUN npm install --production

COPY a-table-app/. .

RUN npm run build


FROM nginx:alpine

COPY a-table-app/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist/a-table/browser /usr/share/nginx/html

EXPOSE 80
