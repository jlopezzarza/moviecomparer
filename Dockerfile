## Golang Builder
FROM golang:alpine AS backendbuilder
WORKDIR /app/
COPY ./main.go .
RUN GOOS=linux CGO_ENABLED=0 go build -a -o moviecomparer

## NPM builder
FROM node:8 AS frontendbuilder
WORKDIR /app/
COPY ./mc/package.json .
RUN npm install
COPY ./mc .
RUN npm run build

## Final container
FROM alpine
# install ca-certs
RUN apk update && apk add --no-cache ca-certificates
RUN update-ca-certificates
WORKDIR /app/
COPY --from=builder /app/moviecomparer .
COPY --from=frontendbuilder /app/build/ mc/build
EXPOSE 8080
ENTRYPOINT ["./moviecomparer"]
