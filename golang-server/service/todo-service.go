package service

import (
	"github.com/tjdalsvndn9/showcase/golang-server/domain"
	repo "github.com/tjdalsvndn9/showcase/golang-server/repo"
)

// TodoService will be used by http
var (
	TodoService TodoServiceInterface = &TodoServiceStruct{r: repo.DynamoDBRepo}
)

// TodoServiceInterface will be used by http
type TodoServiceInterface interface {
	Scan() ([]domain.Todo, error)
}

// TodoServiceStruct will be used by http
type TodoServiceStruct struct {
	r repo.DynamoDBInterface
}

// Scan will be used
func (t *TodoServiceStruct) Scan() ([]domain.Todo, error) {
	return repo.DynamoDBRepo.Scan()
}
