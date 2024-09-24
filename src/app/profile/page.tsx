"use client"
import React, { useState } from 'react';
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';
import Link from "next/link";

const ProfilePage: React.FC = () => {
    const router = useRouter();
    const [data, setData] = useState("nothing");

    const logout = async () => {
        try {
            await axios.get("/api/users/logout");
            toast.success("Çıkış yapıldı");
            Cookies.remove('token');
            router.push('/login');
        } catch (error: any) {
            console.log(error);
            toast.error(error?.response?.data?.message || error.message || "Bir hata oluştu");
        }
    };

    const getUserDetails = async () => {
        try {
            const res = await axios.get('/api/users/apiUsers');
            console.log(res.data);
            if (res.data && res.data.data && res.data.data._id) {
                setData(res.data.data._id);
            } else {
                toast.error("Kullanıcı ayrıntıları alınamadı");
            }
        } catch (error: any) {
            console.log('Error:', error.response); // Hata mesajını loglayın
            toast.error(error?.response?.data?.message || error.message || "Kullanıcı ayrıntıları alınamadı");
        }
    };

    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2'>
            <h1>Profile</h1>
            <hr/>
            <p>Profile page</p>
            <h2 className={"p-3 rounded bg-gray-500"}>
                {data === 'nothing' ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}
            </h2>
            <hr/>
            <button
                onClick={logout}
                className="bg-pink-500 mt-4 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
            >
                Çıkış Yap
            </button>
            <button
                onClick={getUserDetails}
                className="bg-gray-500 mt-4 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
                Kullanıcı ayrıntılarını göster
            </button>
        </div>
    );
};

export default ProfilePage;
