const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) =>  {
    const authorizationHeader = req.header.authorization;
    if (!authorizationHeader) {
        const message =  'Veuillez vous connecter pour obtenir un jeton d\'authentification.'
        return res.status(401).json({message});
        const token = authorizationHeader.split(' ')[1];
        const decodeToken = jwt.verify(
            token,
            `${process.env.PRIVATE_KEY}`,
            (error, decodeToken) => {
                if(error) {
                    const message = "L'utilisateur n'est pas autorisé à accéder à cette ressource";
                    return res.status(403).json({ message, data: error });
                }
                const userId = decodedToken.userId;
                if (req.body.userId && req.body.userId !== userId) {
                    const message = "L'identifiant de l'utilisateur est invalide";
                    res.status(401).json({ message });
                } else {
                    console.log('Utilisateur authentifié');
                    next();
                }
            }
        )
    }
}