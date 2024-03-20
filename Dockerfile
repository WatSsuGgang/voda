FROM node:20.10.0-alpine
RUN rm -rf ./*
WORKDIR /voda
COPY ./frontend/voda/package.json .
RUN npm install
COPY ./frontend/voda .
RUN npm run build
COPY ./frontend/voda .
RUN ls
