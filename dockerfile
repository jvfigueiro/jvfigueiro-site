FROM golang:alpine AS builder
WORKDIR /app
COPY . .
RUN go build -o server main.go

FROM alpine:latest
WORKDIR /root/
COPY --from=builder /app/server .
COPY --from=builder /app/html ./html

EXPOSE 8080

CMD ["./server"]