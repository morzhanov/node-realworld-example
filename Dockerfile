FROM node:latest

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN yarn install

RUN cd frontend
RUN yarn install
RUN yarn build:production
RUN cd ..

COPY . /usr/src/app

EXPOSE 3000
CMD ["npm", "run", "start:prod"]
