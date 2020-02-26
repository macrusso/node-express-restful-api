FROM node:12-alpine as builder

WORKDIR /app
COPY package.json /app/package.json
RUN apk --no-cache add --virtual builds-deps build-base python
RUN npm install
COPY . .
RUN npm run build

RUN pwd && ls

EXPOSE 8080
CMD ["npm", "start"]