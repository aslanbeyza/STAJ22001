import User from "@/models/userModel"
import { connect } from "../../../../dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
//@ts-ignore
import bcrypt from 'bcryptjs';

connect()

export async function POST(request:NextRequest){
    try{
        //istekten nasıl veri alabiliriz
        const reqBody = await request.json()
        const {email, password } = reqBody;
        console.log(reqBody);
        //grs yaptıgımızda kontrol etmeliyiz kullanıcı var mı yokmu veritabanı cagrısı olacagı ıcın await kullancaz
        const user =await User.findOne({ email });
        if (!user) {
            return NextResponse.json({error:"user does not exists"},{status:400});
            //typecast= bir veri türünü başka bir veri türüne dönüştürme işlemidir
        }

        //sifre kontrolu yapma
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json({error:"geçersiz şifre"},{status:400});
        }
        //create token data
        const tokenData = {id:user._id,username: user.username,email:user.email} //databasedeki bu _id
        //create token
        const token =await jwt.sign(tokenData,process.env.TOKEN_SECRET!, {expiresIn: '10s'});
        //token olusturduk ama kullanıcının çerezine koymadık henüz

        //yanıt
        //suankı yanıt aslında bır sonrakı yanıttır
        const response = NextResponse.json({
            message:"Login",
            succes: true,
        })
        response.cookies.set("token",token,{httpOnly:true,});
        return response

        //cerezler artık her yanıtı dondurur

    }catch (error:any){
        return NextResponse.json({error:error.message},{status:400});
    }
}