FROM node:10-slim
WORKDIR /srv/app
COPY . .
RUN npm install \
    && npm run build \
    && npm prune --production \
    && rm -rf src
CMD npm run start:prod
