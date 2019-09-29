FROM node:lts-slim

LABEL maintainer "m.luqman077@gmail.com"

WORKDIR /app

COPY . /app/

RUN npm install --save

ENTRYPOINT ["/bin/sh","-c","npm start"]

CMD []
