FROM node:20.10.0-alpine
WORKDIR /frontend/voda
COPY ./frontend/voda .
RUN npm install
COPY  ./frontend/voda .
RUN npm run build
