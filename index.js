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

        // const categoryCollection = client.db('brightPhotography').collection('category')
        // const reviewCollection  = client.db('brightPhotography').collection('review')


        
        // Add task database
        app.post('/addtask',async (req,res)=>{
            const task = req.body;
            const result = await taskCollection.insertOne(task);
            console.log(result)
            res.send(result)

        })

        app.get('/mytask',async (req,res)=>{
            const query = {};
            const cursor = taskCollection.find(query)
            const task = await cursor.toArray()
            res.send(task);
        })

        // // homopage category
        // app.get('/minicategory',async (req,res)=>{
        //     const query = {};
        //     const cursor = categoryCollection.find(query)
        //     const category = await cursor.limit(3).toArray()
        //     res.send(category);
        // })


        // // service section
        // app.get('/services/:id',async (req,res)=>{
        //     const id = req.params.id;
        //     const query = {_id:ObjectId(id)}
        //     const service = await categoryCollection.findOne(query)
        //     res.send(service)
        // })


        // // review section
        // app.post('/review',async (req,res)=>{
        //     const review = req.body;
        //     const result = await reviewCollection.insertOne(review);
        //     console.log(result)
        //     res.send(result)

        // })


        // app.get('/myreview',async(req,res)=>{
        //     let query = {};
            
        //     if(req.query.email){
        //         query = {
        //             email : req.query.email
        //         }
        //     }

        //     console.log(req.query.email)
        //     const cursor = reviewCollection.find(query)
        //     const review = await cursor.toArray()
        //     console.log(review)
        //     res.send(review)

        // })
    }

    finally{

    }
}

run().catch(err =>console.log(err))







app.get('/',(req,res)=>{
    res.send('Api running for easy task manager')
})

app.listen(port,console.log('port running on ',port))