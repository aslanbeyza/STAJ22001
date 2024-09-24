"use client";
import React from 'react';
import Link from "next/link";
import {useRouter} from "next/navigation";
import{ useEffect, useState } from 'react';
import axios from "axios";
import toast from "react-hot-toast";

const SignupPage = () => {
  /* verileri göstermek için yönlendirici kullanmam lazım */
  const router = useRouter();
  const [user,setUser]=React.useState({email:"",password:"",username:"",})
  const [buttonDisabled,setButtonDisabled]=React.useState(false);/* yanlıs dugme olmaz */
  const [loading,setLoading] = React.useState(false);
  
  const onSignup = async () =>{
        try {
            console.log(user)
        const response= await axios.post("/api/users/signup",user);   /* BURAYI ANLAMADIM  NOLUYO BURDA  */


            console.log("Kayıt ol başarılı",response.data);
        router.push("/login")
        } catch (error:any) {
          console.log("Kayıt ol başarısız",error.message);
          toast.error(error.message);
        }finally{
          setLoading(false);
        }
  }
  /* ne sıklıkla calıstırcam bunu  */
  useEffect(()=>{
 if(user.email.length>0 && user.password.length>0 && user.username.length>0){
  setButtonDisabled(false);
 }else{
  setButtonDisabled(true);
 }
  },[user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-center text-white text-2xl">{loading ? "Yükleniyor" :"Singup"}</h1>
      <hr />
      <label htmlFor="username">USERNAME</label>
      <input
      className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
      id="username"
      type="text"
      value={user.username}
      onChange={(e)=>setUser({...user, username: e.target.value})}
      placeholder='username'
      />
      <label htmlFor="email">email</label>
      <input
      className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
      id="email"
      type="text"
      value={user.email}
      onChange={(e)=>setUser({...user, email: e.target.value})}
      placeholder='email'
      />
      <label htmlFor="password">password</label>
      <input
      className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
      id="password"
      type="password"
      value={user.password}
      onChange={(e)=>setUser({...user, password: e.target.value})}
      placeholder='password'
      />
      <button
       className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
       onClick={onSignup}
       >{buttonDisabled ? "No sign up":"Sign up"}</button>
      <Link href= "/login">Hesabınına git  </Link>
    </div>
  )
}

export default SignupPage
