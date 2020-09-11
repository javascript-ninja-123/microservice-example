package repo

import (
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
	"github.com/tjdalsvndn9/showcase/golang-server/domain"
)

const (
	tablename = "golang-practice"
)

func db() *dynamodb.DynamoDB {
	config := &aws.Config{
		Region: aws.String("us-west-2"),
	}
	sess := session.Must(session.NewSession(config))

	svc := dynamodb.New(sess)
	return svc
}

// NewDynamoDB will be called by service
func NewDynamoDB() DynamoDBInterface {
	return &DynamoDBClient{db: db()}
}

// DynamoDBRepo will be used
var (
	DynamoDBRepo DynamoDBInterface = &DynamoDBClient{db: db()}
)

// DynamoDBInterface for testing
type DynamoDBInterface interface {
	Scan() ([]domain.Todo, error)
}

// DynamoDBClient for testing
type DynamoDBClient struct {
	db *dynamodb.DynamoDB
}

func (d *DynamoDBClient) Scan() ([]domain.Todo, error) {

	params := &dynamodb.ScanInput{
		TableName: aws.String(tablename),
	}
	result, error := d.db.Scan(params)
	if error != nil {
		return nil, error
	}
	var obj []domain.Todo
	dynamodbattribute.UnmarshalListOfMaps(result.Items, &obj)
	return obj, nil
}
