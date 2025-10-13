module.exports = function allowedRoles(...roles) {
  return (req, res) => {

    if (!req.user)
      return res.status(401).json({ message: "Not authenticated" });


    if (!roles(req.user.role))
      return res.status(403).json({ message: "Forbidden: insufficient role" });
   
  };
};
