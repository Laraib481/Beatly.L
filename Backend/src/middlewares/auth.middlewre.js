const jwt = require("jsonwebtoken");

async function authArtist(req, res, next) {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "UNAUTHORIZED"
        });
    }

    const token = authHeader.split(" ")[1];

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.role !== "artist") {
            return res.status(403).json({
                message: "You don't have permission to upload music."
            });
        }

        req.user = decoded;

        next();

    } catch (err) {

        console.log(err);

        return res.status(401).json({
            message: "UNAUTHORIZED"
        });
    }
}

module.exports = { authArtist };