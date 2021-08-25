#client - copia tudo e faz a build
FROM node:16 as client

WORKDIR /srv/www

COPY ./client/package*.json ./
COPY ./client/yarn.lock ./
COPY ./client/vite.config.ts ./

COPY ./client ./

RUN yarn
RUN yarn build

#server - copia tudo e faz a build
FROM node:16-alpine as server

WORKDIR /srv/www

COPY ./server/package*.json ./
COPY ./server/yarn.lock ./

COPY ./server ./

RUN yarn
RUN yarn prebuild
RUN yarn build

CMD ls

#final junta as builds e faz o install de produção
FROM node:16-alpine 
WORKDIR /srv/www/

COPY --from=client /srv/www/dist ./client/dist
COPY --from=server /srv/www/dist ./server/dist

COPY ./server/package*.json ./server
COPY ./server/yarn.lock ./server
COPY ./server/nest-cli.json ./server

RUN cd ./server && yarn install --production 
CMD cd ./server && yarn start:prod