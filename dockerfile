FROM golang:alpine AS builder
WORKDIR /app
COPY . .
RUN go build -o servidor main.go

FROM alpine:latest
WORKDIR /root/
COPY --from=builder /app/servidor .
COPY --from=builder /app/html ./html

EXPOSE 8080

CMD ["./servidor"]