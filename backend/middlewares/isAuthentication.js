import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: "No token" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: "Invalid token" });
    req.id = decoded.id;
    next();
  });
};

export default isAuthenticated;

