/*
 * @Author: AvTiMp
 * @Date: 2019-05
 * @Last Modified by: AvTiMp
 * @Last Modified time: 2019-05
 */
package main

import (
	"net/http"
	"fmt"
)

func main() {
	go  func() {
		fmt.Println(http.ListenAndServe("0.0.0.0:8888", cors(http.FileServer(http.Dir(".")))))
	}()
	fmt.Println("enjoy the 1024 game ~")
	select {}
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