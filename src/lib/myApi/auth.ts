import axios from "axios";

export type SignupPayload = {
    name: string;
    email: string;
    password: string;
};

export type LoginPayload = {
    email: string;
    password: string;
};

export async function signup(payload: SignupPayload) {
    const { data } = await axios.post("/api/auth/signup", payload);
    return data;
}

export async function login(payload: LoginPayload) {
    const { data } = await axios.post("/api/auth/login", payload, { withCredentials: true });
    return data;
}
