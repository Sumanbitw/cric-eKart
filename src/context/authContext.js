import axios from "axios";
import React, { createContext, useContext, useState } from "react";

export const AuthContext = createContext()

export function AuthProvider({ children }){
    const [ user, setUser ] = useState(JSON.parse(localStorage.getItem("auth")) || "")

    const loginUserWithCredentials = async ( email, password ) => {
        try{
            const { data : { user, success, message }} = await axios.post(`https://crickart.herokuapp.com/login`,
        {
            email,
            password
        })
        if(success){
            setUser(user);
            localStorage.setItem("auth", JSON.stringify(user))
        }
        return { user, success, message }
    }catch(error){
        console.log(error)
        return { user : null, message : error.message, success : false }
    }
    }
    
    const createUserWithCredentials = async ( name, email, password ) => {
       try{ 
           const { data : { user, success, message }} = await axios.post(`https://crickart.herokuapp.com/signup`,
        {
            name : name,
            email : email,
            password : password,
        })
        if(success){
            setUser(user)
            localStorage.setItem("auth", JSON.stringify(user))
        }
        return { user, success, message }
    }catch(error){
        console.log(error)
    }
    }
    return (
        <AuthContext.Provider value={{ user, setUser, loginUserWithCredentials, createUserWithCredentials }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(){
    return useContext(AuthContext)
}