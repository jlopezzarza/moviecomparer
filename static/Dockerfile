## NPM builder
FROM node:8 AS frontendbuilder
WORKDIR /app/
COPY ./package.json .
RUN npm install
COPY . .
RUN npm run build

# Nginx to serve the static files
FROM nginx:alpine
COPY --from=frontendbuilder /app/build/ /usr/share/nginx/html
