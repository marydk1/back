const jwt = require('jsonwebtoken');
require('dotenv').config();
function auth(req,res,next){
  const token = (req.headers.authorization || '').replace('Bearer ', '');
  if(!token) return res.status(401).json({message:'No token'});
  try{
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = data;
    next();
  }catch(e){
    return res.status(401).json({message:'Invalid token'});
  }
}
function adminOnly(req,res,next){
  if(req.user && req.user.role === 'admin') return next();
  return res.status(403).json({message:'Admin access required'});
}
module.exports = { auth, adminOnly };
