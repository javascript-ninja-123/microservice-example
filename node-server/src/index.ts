import express, {Request, Response} from "express"
import bodyParser from "body-parser"
import cors from "cors"
import AWS from "aws-sdk"
import { v4 as uuidv4 } from 'uuid';
const DB_TABLE = 'node-practice'
const SNS_ARN = "arn:aws:sns:us-west-2:042816862634:practice"

const db = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10', region:"us-west-2"});
const sns = new AWS.SNS({apiVersion: '2010-03-31', region:"us-west-2"});

const app = express()
app.use(bodyParser.json())
app.use(cors())


app.get("/", async (req: Request, res: Response) => {
    try{
        res.status(200).send({message: "good"})
    }
    catch(err){
        res.status(400).send({message:err.message})
    }
})


const publishText = async (id: string, title: string, description: string) => {
    try{
        const params = {
            TopicArn:SNS_ARN,
            Message:"data from node-server",
            MessageAttributes:{
                "id":{
                    DataType:"String",
                    StringValue:id
                },
                "title":{
                    DataType:"String",
                    StringValue:title
                },
                "description":{
                    DataType:"String",
                    StringValue:description
                }
            }
        }
        await sns.publish(params).promise()
    }
    catch(err){
        throw err
    }
}

app.get("/todos", async (req: Request, res: Response) => {
    try{
        const data = await db.scan({
            TableName:DB_TABLE
        }).promise() 
        res.status(200).send({todos: data})
    }
    catch(err){
        res.status(400).send({message:err.message})
    }
})

app.post("/todos", async (req:Request, res:Response) => {
    try{
        const {title, description} = req.body
        if(!title || !description){
            return res.status(200).send({message:"no title or description"})
        }
        const id =uuidv4()
        const params = {
            TableName:DB_TABLE,
            Item:{
                id,
                title,
                description
            }
        }
        await db.put(params).promise()
        await publishText(id,title, description)
        
        res.status(200).send({message: "uploaded"})
    }
    catch(err){
        res.status(400).send({message:err.message})
    }
})

app.listen(4500, () => console.log("working"))