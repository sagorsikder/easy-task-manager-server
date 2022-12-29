const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const port = process.env.PORT || 5000

const app = express()


// middleware
app.use(cors())
app.use(express.json())





// mongo db connenction
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.edl5qg1.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){

    try{

        const taskCollection = client.db('easyTaskManager').collection('task')



        
        // Add task database
        app.post('/addtask',async (req,res)=>{
            const task = req.body;
            const result = await taskCollection.insertOne(task);
            console.log(result)
            res.send(result)

        })

        app.get('/mytask',async (req,res)=>{

            const email = req.query.email;
            const currentCondition = 'pending';
            const query = {
                email:email,
                condition:currentCondition
            };
            const cursor = taskCollection.find(query)
            const task = await cursor.toArray()
            res.send(task);
        })

        app.get('/completetask',async (req,res)=>{

            const email = req.query.email;
            const currentCondition = 'completed';
            const query = {
                email:email,
                condition:currentCondition
            };
            const cursor = taskCollection.find(query)
            const task = await cursor.toArray()
            res.send(task);
        })

    
        app.post('/update1',async (req,res)=>{
            const id = req.query.id;
            console.log('Update id ',id)
            
          if(id){  const filter = {_id:ObjectId(id)}
          const options = {upsert:true}
          const updateDoc = {
              $set : {
                  condition : 'completed'
              }
          }

          const result = await taskCollection.updateOne(filter,updateDoc,options);
          res.send(result)}
        })
        app.post('/update2',async (req,res)=>{
            const id = req.query.id;
            console.log('Update id ',id)
            
          if(id){  const filter = {_id:ObjectId(id)}
          const options = {upsert:true}
          const updateDoc = {
              $set : {
                  condition : 'pending'
              }
          }

          const result = await taskCollection.updateOne(filter,updateDoc,options);
          res.send(result)}
        })
        app.post('/delete1',async (req,res)=>{
            const id = req.query.id;
            console.log('delete id ',id)
            
          if(id){  
            const query = {_id:ObjectId(id)}

          const result = await taskCollection.deleteOne(query);
          res.send(result)}
        })
    }

    finally{

    }
}

run().catch(err =>console.log(err))







app.get('/',(req,res)=>{
    res.send('Api running for easy task manager')
})

app.listen(port,console.log('port running on ',port))