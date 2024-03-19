FROM node:20.10.0-alpine
WORKDIR /voda
COPY ./voda/package.json ./
RUN npm install
COPY ./voda .
RUN npm run build

