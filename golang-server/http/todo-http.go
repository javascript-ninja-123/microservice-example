package http

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/tjdalsvndn9/showcase/golang-server/service"
)

// TodoHandler will be exported
var (
	TodoHandler TodoHttpInterface = &TodoHttpStruct{service: service.TodoService}
)

// TodoHttp will be used in application
type TodoHttpInterface interface {
	ScanTodos(*gin.Context)
}

//TodoHttpStruct will be exported
type TodoHttpStruct struct {
	service service.TodoServiceInterface
}

// ScanTodos will be used
func (t *TodoHttpStruct) ScanTodos(c *gin.Context) {
	todos, error := t.service.Scan()
	if error != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"message": error.Error(),
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"todos": todos,
	})
}
