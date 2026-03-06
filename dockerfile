# Builder
# Imagem com ferramentas do Go para criar o executável
FROM golang:alpine AS builder
WORKDIR /app
COPY . .
# Compila o arquivo main.go e cria um executável chamado "servidor"
RUN go build -o servidor main.go

# Runner
# Imagem do Alpine para execução do executável em Go
FROM alpine:latest
WORKDIR /root/
# Copia o executável compilado do Builder para a imagem final
COPY --from=builder /app/servidor .
# Copia a pasta HTML para a imagem final
COPY --from=builder /app/html ./html

# Abre a porta 8080
EXPOSE 8080

# Comando para rodar
CMD ["./servidor"]