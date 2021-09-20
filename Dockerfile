FROM node:16.9.1-alpine
LABEL maintainer="aramalayan@gmail.com"
WORKDIR /ordertron
COPY package* .
RUN npm ci && \
    npm cache clean --force
COPY . .
ENTRYPOINT ["node", "src/main.js"]