const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: { type: String, default: "user" }, // SE VA A DEFINIR 3 ROLES computos (admin)- estadistica  - user (medicos en general)
    medico: { type: Schema.Types.ObjectId, ref: 'Medico' ,unique:true}
});

userSchema.pre("save", async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});


module.exports = mongoose.model('User', userSchema);
