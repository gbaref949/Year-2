const ensureAuthenticated = (req,res,next)=>{
    if(req.isAuthenticated()){
        //req.isAuthenticated()will return true if the user is logged in
        next();
    }else{
        // res.redirect("/users/login"); don't need 
        req.flash('error_msg', 'please login to view this resource')
        res.redirect('/useres/login');
    }
}

module.exports = {ensureAuthenticated};