const exp=require('express')
const userapi=exp.Router()
const expressAsyncHandler=require('express-async-handler')
userapi.post('/reg',expressAsyncHandler(async(req,res)=>
    {
        const data=req.body
        const vnrCollections=req.app.get('vnrCollections')
        const found=await vnrCollections.findOne({username:data.username})
        if(found)
        {
            return res.send({message:"User Already Exits",success:false})
        }
        const done=await vnrCollections.insertOne(data)
        if(done.acknowledged)
        {
            return res.send({message:"User Added Successfully",success:true})
        }
        return res.send({message:"Error Occured At Data Base",success:false})
    }))

module.exports=userapi;