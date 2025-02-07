const exp=require('express')
const app=exp();
const cors=require('cors')
require('dotenv').config()
const userapi=require('./User')
app.use(cors({
    origin:"http://localhost:3200",
    credentials:true
}))

const mc=require('mongodb').MongoClient
mc.connect(process.env.DB_URL)
.then(client=>
{
    const vnr=client.db('VNR')
    const vnrCollections=vnr.collection('datascience')
    app.set('vnrCollections',vnrCollections)
    console.log(`Server is Connected to Database`)
    app.listen((process.env.PORT),()=>
    {
        console.log(`Server is Connected to Port : ${process.env.PORT}`)
    })
}
)
.catch(er=>
{
    console.log(`Error Occured at DataBase : ${er.message}`)
}
)

app.use(exp.json())
app.use('/user',userapi)

app.use((er,req,res,next)=>
{
    res.send({message:`Error Occured : ${er.message}`})
})