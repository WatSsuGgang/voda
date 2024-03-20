FROM node:20.10.0-alpine
WORKDIR /docker-workspace
COPY . ./frontend/voda
RUN npm install
COPY  . ./frontend/voda
RUN npm run build
COPY . ./frontend/voda
RUN ls
