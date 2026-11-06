import api from "./api";

export const LoginUser = async(loginData)=>{
    const resp = await api.post("/api/auth/login",loginData);
    return resp.data;
}