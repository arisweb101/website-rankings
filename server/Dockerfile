FROM node:20 AS build

WORKDIR /server

COPY package*.json ./

RUN npm install -g nodemon && npm install

COPY . .

EXPOSE 4000

CMD ["nodemon", "app.js"]
