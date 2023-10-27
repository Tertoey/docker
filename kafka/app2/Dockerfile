FROM node:18.15.0
WORKDIR /app
COPY package.json index.js /app/
RUN npm install
RUN npm i -g nodemon
CMD [ "npm","start" ]