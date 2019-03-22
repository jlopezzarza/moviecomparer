## Golang Builder
FROM golang:alpine AS builder
WORKDIR /app/
RUN  apk update && apk add --no-cache git
COPY . .
RUN GOOS=linux CGO_ENABLED=0 go build -a -o tmdbidexporter

## Final container
FROM alpine
WORKDIR /app/
COPY --from=builder /app/tmdbidexporter .
EXPOSE 8080
ENTRYPOINT ["./tmdbidexporter"]
