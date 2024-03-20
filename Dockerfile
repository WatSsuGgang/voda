FROM node:20.10.0-alpine
WORKDIR /voda
COPY ./frontend/voda/package.json .
RUN ls /voda/
RUN npm install
COPY ./frontend/voda .
RUN ls /voda/
RUN npm run build
RUN ls /voda/
COPY /voda/build .
