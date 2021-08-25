FROM node:16

WORKDIR /srv/www

COPY ./server/package*.json ./server/
COPY ./server/yarn.lock ./server/

COPY ./client/package*.json ./client/
COPY ./client/yarn.lock ./client/
COPY ./client/vite.config.ts ./client/

COPY ./server ./server
COPY ./client ./client

COPY ./config ./config/

RUN cd ./server && yarn
RUN cd ./client && yarn 

CMD node ./config/run.mjs