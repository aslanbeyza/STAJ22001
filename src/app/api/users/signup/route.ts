/* get post put delete standartlasmıs artık  o yuzden hep aynı farz et ki yeni sayfa acıyo http kısmını hayal et user/create/ ordaki create i yapıyo gibi düsün ama bunu export defaultla degil standartlasmıs sekılde yapıyo 
yani yapacagın sey fonksiyonları yazmak
*/
import User from "@/models/userModel"
import { connect } from "../../../../dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
//@ts-ignore
import bcrypt from 'bcryptjs';
import {sendEmail} from "@/helpers/mailer";
connect();
/* modelimizin gelmesi içiin useri import etmemiz lazım */
/* sonrada istegi ve yanıtı al  */
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    console.log(reqBody);
    /* kullanıcının zaten varolup olmadıgını kontrol etme */
    /* sorgu döndürücek */
    /* eposta bulmak istiyorum */
    const user = await User.findOne({ email });
    /* kullanıcı zaten mevcut oldugundan eger kullancı oradaysa devam etsin değilse */
    if (user) {
      return NextResponse.json(
        { error: "kullanıcı zaten mevcut" },
        { status: 400 }
      );
    }
    /* hash password olustur*/
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
     /* ilki kullandıgımız sifre */
    /* CREATE NEW USER */
    const newUser = new User({username,email, password: hashedPassword});
    /* yeni kullanıcıyı olusturduk kaydetcez artık devam edeceğim yenisini bekle demek */
    const savedUser = await newUser.save();
    console.log(savedUser);
    //emaili dogrulayıp yollama db ye
    await sendEmail({email,emailType:"VERIFY",userId:savedUser._id});  //_ dikkat !


    return NextResponse.json({
      message: "kullanıcı basarılı bir şekilde olusturuldu.",
      success: true,
      isVerifyed:true,
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
