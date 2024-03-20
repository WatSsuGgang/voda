FROM node:20.10.0-alpine
WORKDIR /docker-workspace
COPY ./docker-workspace ./frontend/voda
RUN npm install
COPY  ./docker-workspace ./frontend/voda
RUN npm run build
COPY ./docker-workspace ./frontend/voda
RUN ls
