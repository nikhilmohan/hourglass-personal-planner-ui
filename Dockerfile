FROM node:11.1.0-alpine as build

WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY ./ /app/

RUN npm run build

FROM nginx:1.15.8-alpine
COPY /app/nginx/default.conf /etc/nginx/conf.d
COPY --from=build /app/build /usr/share/nginx/html


EXPOSE 80

ENTRYPOINT [ "nginx", "-g", "daemon off;" ]
