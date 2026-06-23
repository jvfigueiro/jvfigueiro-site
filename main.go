package main

import (
	"log"
	"net/http"
	"os"
	"path/filepath"
)

func main() {
	diretorioSite := "./html"

	fileServer := http.FileServer(http.Dir(diretorioSite))

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		
		path := filepath.Join(diretorioSite, r.URL.Path)

		info, err := os.Stat(path)

		if os.IsNotExist(err) || (info != nil && info.IsDir() && semIndex(path)) {
			
			w.WriteHeader(http.StatusNotFound)
			
			http.ServeFile(w, r, filepath.Join(diretorioSite, "404.html"))
			return
		}

		fileServer.ServeHTTP(w, r)
	})

	log.Println("GoServer running on port 8080")
	
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatal("Server start error: ", err)
	}
}

func semIndex(dirPath string) bool {
	indexPath := filepath.Join(dirPath, "index.html")
	_, err := os.Stat(indexPath)
	return os.IsNotExist(err)
}