import createError from "../utils/createError.js"
import Review from "../models/review.model.js"
import Gig from "../models/gig.model.js"
import ReviewLike from "../models/reviewlike.model.js"

export const createReview = async(req,res,next)=>{
   if(req.isSeller) return next(createError(403,"Sellers can't create a review"));
   


   const newReview=new Review({
         userId: req.userId,
         gigId: req.body.gigId,
         desc: req.body.desc,
         star: req.body.star
      }
   );
   
   try{
   const review= await Review.findOne({gigId:newReview.gigId,userId:newReview.userId,});

   if(review) return next(createError(403,"You have already created a review for this gig"))

   const savedReview=await newReview.save();

   await Gig.findByIdAndUpdate(req.body.gigId,{$inc:{"totalStars":req.body.star,"starNumber":1}})
   // console.log(req.gigId,"  ",req.body.gigId)
   res.status(201).send(savedReview)
 }catch(err){
     next(err);
 }
}


export const getReviews=async(req,res,next)=>{
    try{
   const reviews=await Review.find({gigId:req.params.gigId});
   //newcode
   // const newusername=reviews.map((c)=>{return c.userId});
   const newdata123=[];
   for(let i=0;i<reviews.length;i++){
       const temp=await ReviewLike.find({'reviewId':reviews[i]._id,'userId':req.userId}).count();
       newdata123.push(temp);
   }
   // console.log(newdata123)
   const actualdata=[]
   for(let i=0;i<newdata123.length;i++){
       const temp={_id:reviews[i]._id,
           userId:reviews[i].userId,
           desc:reviews[i].desc,
           gigId:reviews[i].gigId,
           star:reviews[i].star,
           createdAt:reviews[i].createdAt,
           updatedAt:reviews[i].updatedAt,
           islike:newdata123[i]
       }
       actualdata.push(temp);
   }
   //newcode
   res.status(200).send(actualdata)
    }catch(err){
       next(err);
    }
   }

   export const deleteReview=async(req,res,next)=>{
    try{
   
    }catch(err){
       next(err);
    }
   }