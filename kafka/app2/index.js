const express = require('express')
const kafka = require('kafka-node')
const mongoogse = require('mongoose')
const app = express()
app.use(express.json())

const dbRunning = ()=>{
    mongoogse.connect(process.env.MONGO_URL)
    const User = new mongoogse.model('users',{
        name:String,
        email : String ,
        password:String
    }) 
    const client = new kafka.KafkaClient({kafkaHost:process.env.KAFKA_BOOTSTRAP_SERVERS})
    const consumer = new kafka.Consumer(client,[{topic:process.env.KAFKA_TOPIC}],{
        autoCommit: false
    })
    consumer.on('message', async(message)=>{
        const user = await new User(JSON.parse(message.value))
        await user.save()
    })
    consumer.on('error',(err)=>{
        console.log("Errorsssd", err);
    })
}

setTimeout(dbRunning,10000)
app.listen(process.env.PORT)