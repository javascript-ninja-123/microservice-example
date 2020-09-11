package application

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/tjdalsvndn9/showcase/golang-server/http"
)

var (
	router = gin.Default()
)

//StartApplication will be called by main.go
func StartApplication() {

	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"*"}
	// config.AllowOrigins == []string{"http://google.com", "http://facebook.com"}

	router.Use(cors.New(config))

	router.GET("/todos", http.TodoHandler.ScanTodos)

	router.Run(":6500")
}
