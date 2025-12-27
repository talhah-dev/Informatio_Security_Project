import axios from "axios";

export type userPayload = {
    name: string;
    email: string;
    password: string;
};


export async function allUsers() {
    return await axios.get("/api/user/alluser", { withCredentials: true });
}