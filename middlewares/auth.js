const {getUser}=require('../service/auth')

async function restrictToLoggedInUsersOnly(req,res,next){
    const userUid=req.cookies?.uid;
    // const userUid=req.headers['authorization'];

    if(!userUid){
        return res.redirect('/login')
    }
    //extracting token from bearer token
   
    const user=getUser(userUid);
    // const user=getUser(token);

    if(!user){
        return res.redirect('/login')
    }

    req.user=user;
    next()
}

async function checkAuth(req,res,next){
    // const userUid=req.cookies?.uid;

    const userUid=req.headers['authorization'];
    const token=userUid.split('Bearer ')[1];
    // const user=getUser(userUid);
    const user=getUser(token);

    req.user=user;
    next()
}

module.exports={
    restrictToLoggedInUsersOnly,
    checkAuth
}