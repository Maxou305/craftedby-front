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
EXPOSE 80

COPY scripts/start.sh /scripts/start.sh
RUN chmod +x /scripts/start.sh

CMD ["/scripts/start.sh"]