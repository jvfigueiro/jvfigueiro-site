package main

import (
	"log"
	"net/http"
	"os"
	"path/filepath"
)

func main() {
	// Define a pasta onde estão os arquivos do site
	diretorioSite := "./html"

	// Cria o FileServer padrão para entregar os arquivos quando eles existirem
	fileServer := http.FileServer(http.Dir(diretorioSite))

	// Criamos nossa FUNÇÃO CUSTOMIZADA para interceptar as requisições
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		
		// Descobre qual o caminho completo do arquivo que o navegador pediu
		path := filepath.Join(diretorioSite, r.URL.Path)

		// Verifica se o arquivo ou diretório existe
		info, err := os.Stat(path)

		// Lógica de erro 404
		if os.IsNotExist(err) || (info != nil && info.IsDir() && semIndex(path)) {
			
			// Avisa o navegador que é um erro 404
			w.WriteHeader(http.StatusNotFound)
			
			// Entrega a sua página bonita de erro
			http.ServeFile(w, r, filepath.Join(diretorioSite, "404.html"))
			return
		}

		// Se o arquivo existe, deixa o FileServer padrão cuidar do resto
		fileServer.ServeHTTP(w, r)
	})

	log.Println("GoServer running on port 8080")
	
	// Inicia o servidor
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatal("Server start error: ", err)
	}
}

// Função auxiliar para verificar se um diretório tem index.html
func semIndex(dirPath string) bool {
	indexPath := filepath.Join(dirPath, "index.html")
	_, err := os.Stat(indexPath)
	return os.IsNotExist(err)
}