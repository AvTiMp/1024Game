package main

import (
	"io/ioutil"
	"fmt"
	"net/http"
)

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/healthz", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("OK"))
	})

	mux.HandleFunc("/elelist", func(w http.ResponseWriter, r *http.Request) {
		fData, err := ioutil.ReadFile("./config/config.json")
		if err != nil {
			fmt.Println(err)
			return
		}
		w.Write(fData)
	})

	http.ListenAndServe("0.0.0.0:8000", cors(mux))
}

func cors(handler http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		//fmt.Println(r.Header, r.Host, r.URL.String(), r.URL.Opaque)
		w.Header().Set("Access-Control-Allow-Credentials", "true")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Hawkular-Tenant, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, X-Requested-With, If-Modified-Since, X-HTTP-Method-Override")
		w.Header().Set("Access-Control-Allow-Origin", r.Header.Get("Origin"))
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS, DELETE, PUT, PATCH")

		if r.Method == "OPTIONS" {
			w.WriteHeader(200)
			return
		}

		handler.ServeHTTP(w, r)
	})
}