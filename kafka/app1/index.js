const express = require('express')
const kafka = require('kafka-node')
const sequelize = require('sequelize')
const app = express()
app.use(express.json())

const dbRunning = ()=>{
    const db = new sequelize(process.env.POSTGRES_URL)
    const User = db.define('user1',{
        name: sequelize.STRING,
        email:sequelize.STRING,
        password:sequelize.STRING
    })
    const sensor1 = db.define('sensors1',{
        name: sequelize.STRING,
        email:sequelize.STRING,
        password:sequelize.STRING
    })
    db.sync({force:true})
    const client = new kafka.KafkaClient({kafkaHost:process.env.KAFKA_BOOTSTRAP_SERVERS})
    const producer = new kafka.Producer(client)
    producer.on('ready',()=>{
        app.post('/',(req,res)=>{
            producer.send([{topic:process.env.KAFKA_TOPIC,messages:JSON.stringify(req.body)}],async (err,data)=>{
                if (err){
                    console.log(err)
                }else{
                    await User.create(req.body)
                    res.json({results:req.body,message:'bsssss'})
                }
            })
        })
        app.post('/topic2',(req,res)=>{
            producer.send([{topic:"topic2",messages:JSON.stringify(req.body)}],async (err,data)=>{
                if (err){
                    console.log(err)
                }else{
                    // await sensor1.create(req.body)
                    res.json({results:req.body,message:'bsssss'})
                }
            })
        })
    })
}

setTimeout(dbRunning,10000)
app.listen(process.env.PORT)