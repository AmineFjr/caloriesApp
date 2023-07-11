const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) =>  {
    let authorizationHeader = req.header.authorization;
    if (authorizationHeader) {
        let token = authorizationHeader.split(' ')[1];
        let decodeToken = jwt.verify(
            token,
            `${process.env.PRIVATE_KEY}`,
            (error, decodeToken) => {
                if(error) {
                    let message = "L'utilisateur n'est pas autorisé à accéder à cette ressource";
                    return res.status(403).json({ message, data: error });
                }
                let userId = decodedToken.userId;
                if (req.body.userId && req.body.userId !== userId) {
                    let message = "L'identifiant de l'utilisateur est invalide";
                    res.status(401).json({ message });
                } else {
                    console.log('Utilisateur authentifié');
                    next();
                }
            }
        )
    }
    return res.status(401).json('Veuillez vous connecter pour obtenir un jeton d\'authentification.');
}