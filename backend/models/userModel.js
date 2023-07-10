module.exports = (sequelize, DataTypes) => {
    return sequelize.define("User", {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: "Cet adresse mail est déja utilisé"
            },
            validate: {
                isEmail: { msg: "Veuillez entrer une adresse mail au bon format." }, // validation du schéma de l'entrée
                notNull: { msg: "Veuillez entrer une adresse mail." },
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: "Veuillez entrer un mot de passe." },
            },
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    })
}