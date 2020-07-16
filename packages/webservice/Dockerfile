FROM node:12-slim

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --prod
COPY dist ./dist

CMD ["yarn", "start"]