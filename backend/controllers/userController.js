const User = require('../models/userModel');
const bcrypt = require("bcrypt");

const jwt = require('jsonwebtoken');
const { ValidationError } = require("sequelize");

exports.singUp = (req, res) => {
    bcrypt.hash(req.body.password, 10).then(
        (hash) => {
            User.create(
                {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: hash,
                    isAdmin: false
                }
            ).then(
                (user) => {
                    const message = `L'utilisateur ${req.body.firstName} a bien été créé.`;
                    res.status(201).json({message, data: user})
                }
            ).catch(error => {
                console.log("L'utilisateur n'a pas être crée !" + error)
            })
        }
    );
}
exports.sign = (req, res) => {
    User.findOne({
        where: {email: req.body.email}
    }).then(
        (user) => {
            if (!user) {
                const message = `L'utilisateur est introuvable`;
                return res.status(404).json({message})
            }
            bcrypt.compare(req.body.password, user.password).then(
                (valid) => {
                    if (!valid) {
                        const message = "Le mot de passe est incorrect";
                        return res.status(401).json({message});
                    }

                    let userId = user.id;
                    let token = jwt.sign(
                        {userId: userId},
                        `${process.env.PRIVATE_KEY}`,
                        {algorithm: "HS256", expiresIn: "24h"}
                    )
                    
                    return res.status(200).json({userId, token})
                }
            ).catch((error) => {
                const message = `L'utilisateur n'a pas pu se connecté`;
                return res.status(500).json({message, error});
            })
        }
    );
}

exports.getUser = (req, res) => {
    User.findByPk(req.params.id)
        .then((user) => {
            if (user) {
                const message = 'Utilisateur retrouver avec succès';
                return res.status(200).json({message, data: user})
            } else {
                const message = 'Utilisateur non retrouvé';
                return res.status(500).json({message})
            }
        })
        .catch(error => {
            const message = 'Utilisateur non retrouvé';
            return res.status(500).json({message})
        })
}

exports.updateUser = (req, res) => {
    User.findOne({
        where: {
            id: req.params.id,
        }
    })
        .then((user) => {
            if (!user) {
                const message =
                    "L'utilisateur demandé n'existe pas, veuillez réessayer avec un autre identifiant.";
                return res.status(404).json({message});
            }
            const firstName = req.body.firstName;
            const lastName = req.body.lastName;
            const email = req.body.email;
            user.update({
                firstName: firstName,
                lastName: lastName,
                email: email,
            })
                .then((post) => {
                    const message = "Votre profil a été modifié.";
                    return res.status(201).json({message, data: user});
                })
                .catch((error) => {
                    if (error instanceof ValidationError) {
                        return res.status(400).json({message: error.message, data: error});
                    }
                    const message =
                        "L'update du profil a échoué, veuillez réessayer dans quelques instants.";
                    return res.status(500).json({message, data: error});
                });

        })
        .catch((error) => {
            const message =
                "La modification d'un utilisateur a échoué, veuillez réessayer dans quelques instants.";
            return res.status(500).json({message, data: error});
        });
};

exports.deleteUser = (req, res) => {
    User.findOne({
        where: {
            id: req.params.id,
        },
    })
        .then((user) => {
            if (!user) {
                const message = "L'utilisateur demandé n'existe pas, veuillez réessayer avec un autre identifiant.";
                return res.status(404).json({message});
            }
            return user.destroy().then(() => {
                const message = "L'utilisateur supprimé avec succès";
                return res.status(200).json({message});
            });
        })
        .catch((error) => {
            const message =
                "La suppression d'un utilisateur a échoué, veuillez réessayer dans quelques instants.";
            return res.status(500).json({message, data: error});
        });
};