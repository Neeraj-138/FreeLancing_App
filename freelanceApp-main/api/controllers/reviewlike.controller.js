import createError from "../utils/createError.js"
import ReviewLike from "../models/reviewlike.model.js"
// import reviewlikeModel from "../models/reviewlike.model.js";

export const createReviewLike = async(req,res,next)=>{
    if(req.isSeller) return next(createError(403,"Sellers can't gave a like"));
   
    const newReviewLike=new ReviewLike({
          userId: req.userId,
          reviewId: req.body.reviewId,
       }
    );
    
    try{
    const review= await ReviewLike.findOne({reviewId:newReviewLike.reviewId,userId:newReviewLike.userId});
 
    if(review) return next(createError(403,"You have already Like a this review"))
 
    const savedReview=await newReviewLike.save();
 
    // await Gig.findByIdAndUpdate(req.body.gigId,{$inc:{"totalStars":req.body.star,"starNumber":1}})
    // console.log(req.gigId,"  ",req.body.gigId)
    res.status(201).send(savedReview)
  }catch(err){
      next(err);
  }
}


export const getReviewLike=async(req,res,next)=>{
    try{
        const reviewlike=await ReviewLike.find({reviewId:req.params.reviewId});
        // console.log(reviewlike);
        res.status(200).send(reviewlike)
        }catch(err){
            next(err);
      }
}

   