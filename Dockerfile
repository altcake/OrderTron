FROM node:18.9.1-alpine
LABEL maintainer="aramalayan@gmail.com"
RUN apk add --no-cache \
    gcompat
WORKDIR /ordertron
COPY package* ./
RUN npm ci --production && \
    npm cache clean --force
COPY ./ ./
ENTRYPOINT ["node", "src/main.js"]