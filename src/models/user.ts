import mongoose from "mongoose";

interface IUser {
    name: string;
    email: string;
    password: string;
}

const UserSchema = new mongoose.Schema<IUser>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;