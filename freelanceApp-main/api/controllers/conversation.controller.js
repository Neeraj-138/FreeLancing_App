import createError from "../utils/createError.js"
import User from "../models/user.model.js"  //new code

import Conversation from "../models/conversation.model.js"

export const createConversations=async(req,res,next)=>{
    const newConversation= new Conversation({
        id: req.isSeller ? req.userId + req.body.to : req.body.to + req.userId, //req.userId=seller
        sellerId: req.isSeller ? req.userId : req.body.to,
        buyerId: req.isSeller ? req.body.to : req.userId,
        readBySeller: req.isSeller,
        readByBuyer: !req.isSeller,
    })

    try{
        const savedConversation= await newConversation.save();
        res.status(201).send(savedConversation);
    }catch(err){
        next(err)
    }
}


export const getConversations=async(req,res,next)=>{
    try{
        const conversations=await Conversation.find(req.isSeller?{sellerId:req.userId}:{buyerId:req.userId}).sort({updatedAt:-1});

        //new code
        const newusername=conversations.map((c)=>{return req.isSeller ? c.buyerId :c.sellerId});
        const newdata123=[];
        for(let i=0;i<newusername.length;i++){
            const temp=await User.findOne({'_id':newusername[i]},{'username':1,'_id':0});
            newdata123.push(temp);
        }
        const actualdata=[]
        for(let i=0;i<newusername.length;i++){
            const temp={_id:conversations[i]._id,
                id:conversations[i].id,
                sellerId:conversations[i].sellerId,
                buyerId:conversations[i].buyerId,
                readBySeller:conversations[i].readBySeller,
                readByBuyer:conversations[i].readByBuyer,
                createdAt:conversations[i].createdAt,
                updatedAt:conversations[i].updatedAt,
                __v:conversations[i].__v,
                lastMessage:conversations[i].lastMessage,
                username:newdata123[i].username}
            actualdata.push(temp);
        }
        // console.log(actualdata);
        res.status(200).send(actualdata);
        //new code
    }catch(err){
        next(err)
    }
}
export const getSingleConversations=async(req,res,next)=>{
    try{
        const conversation=await Conversation.findOne({id:req.params.id});

        if(!conversation) return next(createError(404,"Not found!"));
        res.status(200).send(conversation);
    }catch(err){
        next(err)
    }
}
export const updateConversations=async(req,res,next)=>{
    try{
        const updatedConversation=await Conversation.findOneAndUpdate({id:req.params.id},{
            $set:{
                // readBySeller:req.isSeller,
                // readByBuyer:!req.isSeller,
               ...(req.isSeller ? {readBySeller:true} :{readByBuyer:true})
            },
        },
            {new:true}
        );
        res.status(200).send(updatedConversation);
    }catch(err){
        next(err)
    }
}