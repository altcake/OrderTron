FROM node:20.16.0-alpine
LABEL maintainer="aramalayan@gmail.com"
RUN apk add --no-cache \
    gcompat
WORKDIR /ordertron
COPY ./ ./
RUN yarn install --production && \
    yarn cache clean --force
ENTRYPOINT ["node", "src/main.js"]