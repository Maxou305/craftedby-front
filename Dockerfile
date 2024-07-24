# étape de build
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

  # étape de production
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html

COPY scripts/start.sh /scripts/start.sh
COPY scripts/env.sh /scripts/env.sh
RUN chmod +x /scripts/start.sh /scripts/env.sh

EXPOSE 80

CMD ["/scripts/start.sh"]