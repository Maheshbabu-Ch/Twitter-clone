const router = require('express').Router()
const authtoken = require('./middleware')
const { Tweet } = require("../model/TweetSchema")

const createtweet = async (req,res,next) => {
    const newTweet = new Tweet(req.body)
    try{
        const savetweet = await newTweet.save();
        return res.status(200).json(savetweet);
    }
    catch(err){ next(err); }
}

const deletetweet = async (req, res, next) => {
    try{
        const tweet = await Tweet.findById(req.params.id);
        if(!tweet)
        {
            return res.status(411).json("Tweet Not Found")
        }
        if(tweet.userID === req.user.id)
        {
            await tweet.deleteOne();
            return res.status(200).json("Tweet Deleted")
        }
        else{
            return res.status(410).json("Unauthorized")
        }
    }catch(err){ next(err); }
}

const like = async (req, res, next) => {
    try{
        const tweet = await Tweet.findById(req.params.id);
        if(!tweet.likes.includes(req.body.id))
        {
            await tweet.updateOne({$push : {likes:req.body.id}})
            return res.status(200).json("Liked the tweet")
        }
        else{
            await tweet.updateOne({$pull : {likes:req.body.id}})
            return res.status(200).json("Disiked the tweet")
        }

    }catch(err){ next(err); }
}

const getmytweets = async (req,res,next) => {
    try{
        const tweets = await Tweet.find({userID: req.params.id}).sort(
            { createdAt: -1});
            return res.status(200).json(tweets)
    }catch(err){ next(err);}
}
// const gettweet = async(req,res)=>{
//     const tweet = await Tweet.findById(req.params.id)
//     return res .status(200).json(tweet)
// }
// router.get("/:id",gettweet)
//create a new tweet
router.post("/", authtoken, createtweet)

router.get('/ret', async(req, res) => {
    return res.status(200).json(await Tweet.find().sort({ createdAt: -1}));
});
//delete a tweet
router.delete("/:id", authtoken, deletetweet)

//Like a tweet
router.put("/:id/like", authtoken, like)

//get user tweets
router.get("/user/:id", getmytweets)

module.exports = router;