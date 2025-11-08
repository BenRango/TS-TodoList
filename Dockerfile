FROM node:20-alpine

WORKDIR /AGRICONNECT

COPY *.json ./

RUN npm i 

COPY . /AGRICONNECT/

EXPOSE 8000

CMD [ "npm", "run", "backend:dev" ]