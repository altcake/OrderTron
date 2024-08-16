FROM node:20.16.0-alpine
LABEL maintainer="aramalayan@gmail.com"
RUN apk add --no-cache \
    gcompat
WORKDIR /ordertron
COPY ./ ./
RUN npm install --omit=dev && \
    npm cache clean --force
ENTRYPOINT ["node", "src/main.js"]