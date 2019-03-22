## Golang Builder
FROM golang:alpine AS builder
WORKDIR /app/
COPY ./main.go .
RUN GOOS=linux CGO_ENABLED=0 go build -a -o moviecomparer

## Final container
FROM alpine
# install ca-certs
RUN apk update && apk add --no-cache ca-certificates
RUN update-ca-certificates
WORKDIR /app/
COPY --from=builder /app/moviecomparer .
EXPOSE 8080
ENTRYPOINT ["./moviecomparer"]
