import gigModel from "../models/gig.model.js";
import Gig from "../models/gig.model.js"
import createError from "../utils/createError.js"
import User from "../models/user.model.js"
export const createGig=async(req,res,next)=>{
    if(!req.isSeller) return next(createError(403,"Only seller can create a gig"))

    const newGig=new Gig({
        userId:req.userId,
        ...req.body,
    });
    try{
        const saveGig= await newGig.save();
        res.status(201).json(saveGig)
    }catch(err){
        next(err)
    }
}
export const deleteGig=async(req,res,next)=>{
    
    try{
        const gig= await Gig.findById(req.params.id);
        if(gig.userId!==req.userId) return next(createError(403,"You can delete only your gig"))
        await Gig.findByIdAndDelete(req.params.id)
        res.status(200).send("Gig has been deleted")
    }catch(err){
        next(err)
    }
    
}
export const getGig=async(req,res,next)=>{
    try{
      const gig= await Gig.findById(req.params.id)
      if(!gig) next(createError(404,"Gig not Found"));
      res.status(200).send(gig)
    }catch(err){
        next(err)
    }   
}
export const getGigs=async(req,res,next)=>{
    const q=req.query;
    const filters={
        ...(q.userId && {userId:q.userId}),
        ...(q.cat && {cat:q.cat}),
        ...((q.min || q.max) && {price:{...(q.min && {$gt:q.min}),...(q.max && {$lt:q.max})}}),
        ...(q.search && {title:{$regex:q.search, $options:"i"}})
    }
    try{
        const gigs=await Gig.find(filters).sort({[q.sort]:-1})
        //new code
        const newusername=gigs.map((c)=>{return c.userId});
        const newdata123=[];
        for(let i=0;i<newusername.length;i++){
            const temp=await User.findOne({'_id':newusername[i]},{'username':1,'img':1,'_id':0});
            newdata123.push(temp);
        }
        const actualdata=[]
        for(let i=0;i<newusername.length;i++){
            const temp={_id:gigs[i]._id,
                userId:gigs[i].userId,
                desc:gigs[i].desc,
                title:gigs[i].title,
                totalStars:gigs[i].totalStars,
                starNumber:gigs[i].starNumber,
                cat:gigs[i].cat,
                price:gigs[i].price,
                cover:gigs[i].cover,
                images:gigs[i].images,
                shortTitle:gigs[i].shortTitle,
                shortDesc:gigs[i].shortDesc,
                deliveryTime:gigs[i].deliveryTime,
                revisionNumber:gigs[i].revisionNumber,
                features:gigs[i].features,
                sales:gigs[i].sales,
                createdAt:gigs[i].createdAt,
                updatedAt:gigs[i].updatedAt,
                username:newdata123[i].username,
                img:newdata123[i].img
            }
            actualdata.push(temp);
        }
        // console.log(actualdata);
        // res.status(200).send(actualdata);
        //new code

        res.status(200).send(actualdata)
    }catch(err){
        next(err)
    }   
}