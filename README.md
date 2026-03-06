# 🌐 João Figueiró | Site Pessoal & Portfólio

Este é o repositório do meu site pessoal, que contém uma pequena apresentação, portfólio, e algumas demonstrações de hobbies. Desenvolvido com foco absoluto em **simplicidade, performance e segurança**.

A interface foi construída do zero utilizando HTML5, CSS3 e JS puro, sem frameworks pesados, garantindo um carregamento instantâneo. Por debaixo do capô, o site é servido por um servidor web customizado escrito em **Go**, projetado para ser leve e rodar em um contêiner Docker na minha própria infraestrutura.

## 🚀 Destaques Técnicos

* **Custom Go Server:** O `main.go` não apenas serve os arquivos estáticos, mas possui um interceptador de rotas construído do zero para tratar erros 404 nativamente e entregar uma página personalizada.
* **Docker Multi-stage Build:** O `Dockerfile` utiliza o conceito de multi-stage. Ele usa a imagem pesada do Go apenas para compilar o binário e, em seguida, transfere apenas o executável (junto com a pasta `/html`) para uma imagem Alpine.
* **Design Responsivo:** UI moderna utilizando variáveis CSS, suporte a tema escuro nativo e efeitos de desfoque (backdrop-filter), visando remeter à simplicidade e modernidade.

## 🛠️ Stack Utilizada

* **Backend:** Golang (`net/http`)
* **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
* **Infraestrutura:** Docker, Docker Compose
* **Hospedagem:** Hospedado em infraestrutura própria, com acesso público via Cloudflare Tunnel