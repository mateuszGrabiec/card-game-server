FROM node:12.18.3
LABEL maintainer="Mateusz Grabiec"

RUN mkdir app
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000
ENTRYPOINT [ "npm", "start" ]