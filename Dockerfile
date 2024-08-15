FROM node:20.16.0-alpine
LABEL maintainer="aramalayan@gmail.com"
RUN apk add --no-cache \
    gcompat
WORKDIR /ordertron
COPY package* ./
RUN npm ci --omit=dev && \
    npm cache clean --force
COPY ./ ./
ENTRYPOINT ["node", "src/main.js"]