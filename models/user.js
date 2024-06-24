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
    role: { type: String, default: "user" },
    medico: { type: Schema.Types.ObjectId, ref: 'Medico' ,unique:true}
});

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

module.exports = mongoose.model('User', userSchema);
