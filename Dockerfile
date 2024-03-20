FROM node:20.10.0-alpine
WORKDIR /var/www/html
COPY ./frontend/voda .
RUN npm install
COPY  ./frontend/voda .
RUN npm run build
