const router = require('express').Router();
const { User } = require('../model/Schema');
const authtoken = require('./middleware');
const { Tweet } = require("../model/TweetSchema");

const getUser = async (req, res, next) => {
    try{
        const user = await User.findById(req.params.id);
        if(!user) { return res.status(409).json("Invalid ID") }
        const {password , ...info} = user._doc;
        res.status(200).json(info);
        } catch(err){next(err);} }

const update =  async (req, res, next) => {
    if(req.params.id === req.user.id) {
        try{
            const updateuser = await User.findByIdAndUpdate(req.params.id, {$set : req.body,},{new : true,});
            res.status(200).json(updateuser);
            } catch(err){   next(err);  }   }
    else {  return res.status(407).json('cannot update');   }   }

const deleteuser =  async (req, res, next) => {
    if(req.params.id === req.user.id)   {
        try {
            await User.findByIdAndDelete(req.params.id);
            await Tweet.deleteMany({userID: req.params.id})
            res.status(200).json("user deleted");
            }   catch(err)  {   next(err);  }   }
    else {  return res.status(407).json('cannot delete ');  }
}

const follow = async (req, res, next) => {
    try{
        const user = await User.findById(req.params.id);

        const currentUser = await User.findById(req.user.id)

        if(!user.followers.includes(req.user.id))
        {
            await user.updateOne({$push:{followers:req.user.id}});
            await currentUser.updateOne({$push:{following:req.params.id}});
        }
        else{
            res.status(409).json("You Already Following this User");
        }
        res.status(200).json("Following the user")
    }
    catch(err)
    {
        next(err);
    }
};

const unfollow = async (req, res, next) => {
    try{
        const user = await User.findById(req.params.id);

        const currentUser = await User.findById(req.user.id)

        if(currentUser.following.includes(req.params.id))
        {
            await user.updateOne({$pull:{followers:req.user.id}});
            await currentUser.updateOne({$pull:{following:req.params.id}});
        }
        else{
            res.status(409).json("You are not Following this User");
        }
        res.status(200).json("unfollowing the user")
    }
    catch(err)
    {
        next(err);
    }
};

router.get('/', async(req, res) => {
    return res.status(200).json(await User.find());
});

// router.delete('/:id', authtoken ,async(req, res) => {
//     if(req.params.id === req.user.id)
//     {
//     await User.findByIdAndDelete(req.params.id);
//     return res.status(200).json("deleted successful")
//     }
// });

router.put('/:id', authtoken , update);
router.get('/find/:id', getUser);
router.delete("/:id", authtoken, deleteuser);
router.put("/follow/:id", authtoken, follow);
router.put('/unfollow/:id', authtoken, unfollow)

module.exports = router;