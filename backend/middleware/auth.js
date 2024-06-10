// import jwt from "jsonwebtoken";

// const authMiddleware = async (req, res, next) => {
//     const { token } = req.headers;
//     if (!token) {
//         return res.json({ success: false, message: "Not Authorized.Try Again" })
//     }

//     try {
//         const token_decode = jwt.verify(token, process.env.JWT_SECRET)
//         req.body.userId = token_decode.id;
//         next();

//     } catch (error) {
//         console.log(error)
//         res.json({ success: false, message: "Error" })
//     }
// }





// export default authMiddleware


import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ success: false, message: "Not Authorized. Try Again." });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ success: false, message: "Not Authorized. Try Again." });
    }

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(403).json({ success: false, message: "Token Expired. Please login again." });
        }
        console.error(error);
        res.status(403).json({ success: false, message: "Invalid Token. Please login again." });
    }
};

export default authMiddleware;
