import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const adminSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

adminSchema.methods.matchPassword = async function (enteredPassword) {
    const enteredPassHashed = await bcrypt.hash(enteredPassword,10)
    return await bcrypt.compare( this.password,enteredPassHashed);
};

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;