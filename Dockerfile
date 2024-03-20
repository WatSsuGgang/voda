FROM node:20.10.0-alpine
USER root
RUN chmod -R 777 /frontend
USER jenkins
WORKDIR voda
COPY ./frontend/voda .
RUN npm install
COPY  ./frontend/voda .
RUN npm run build
