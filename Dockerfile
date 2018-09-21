## Builder
FROM golang:alpine AS builder

WORKDIR /app/

COPY ./main.go .

RUN GOOS=linux CGO_ENABLED=0 go build -a -o moviecomparer 

## Runner
FROM alpine

WORKDIR /app/

COPY --from=builder /app/moviecomparer . 
COPY ./static static 

EXPOSE 8080

ENTRYPOINT ["./moviecomparer"]
