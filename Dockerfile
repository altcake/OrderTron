FROM node:16.17.0-alpine
LABEL maintainer="aramalayan@gmail.com"
RUN apk add --no-cache \
    g++ \
    build-base \
    cairo-dev \
    jpeg-dev \
    pango-dev \
    musl-dev \
    giflib-dev \
    pixman-dev \
    pangomm-dev \
    libjpeg-turbo-dev \
    freetype-dev
WORKDIR /ordertron
COPY package* ./
RUN npm ci --production && \
    npm cache clean --force
COPY ./ ./
ENTRYPOINT ["node", "src/main.js"]