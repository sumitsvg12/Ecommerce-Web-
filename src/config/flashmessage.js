

module.exports.setflash=async (req,res,next)=>{
       res.locals.flash={
         "success":req.flash("success"),
         "err":req.flash("err"),
       }
       next();
}