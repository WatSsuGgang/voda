FROM node:20.10.0-alpine
WORKDIR voda
COPY ./frontend/voda .
RUN npm install
COPY  ./frontend/voda .
RUN npm run build

RUN adduser --gecos "" --disabled-password --quiet jenkins
RUN echo "jenkins:jenkins" | chpasswd
RUN chown jenkins:jenkins /home/jenkins
