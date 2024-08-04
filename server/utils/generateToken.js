import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in miliseconds
    httpOnly: true, // prevents XSS attacks aka cross-site scripting attacks**
    sameSite: "strict", // CSRF attacks aka cross-site request forgery attacks
    secure: process.env.NODE_ENV !== "development", // while in development secure = false, production secure = true
  });
};

export default generateTokenAndSetCookie;

//** so this cookie is not accessible via javascript */
