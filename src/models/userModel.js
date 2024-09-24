import mongoose from "mongoose";

/*  Bu, MongoDB veritabanında saklanan belgelerin şekil, içerik ve doğrulama kurallarını belirlemeye yarar. */
const userSchema = new mongoose.Schema({
       username:{
        type:String,
        required:[true,"lütfen bir kullanıcı girin"],
        unique:true,
       },
       email:{
        type:String,
        required:[true,"lütfen bir email girin"],
        unique:true,
       },
       password:{
        type:String,
        required:[true,"lütfen bir şifre girin "],
        unique:true,
       },
       /* ortak alanlar oluyo buralarda  rollerimi bir yerden getiriyorum enum dosyasını yapabileceğim yerden numaralandırmayı yönetici yöneticisi gibi getir */
       /* öğrenci-öğretmen     öğretmen cok rolu var  */
       isVerifyed:{
        type:Boolean,
        default:false,
       },
       isAdmin:{
        type:Boolean,
        default:false,
       },
       forgotPasswordToken:String,
       forgotPasswordTokenExpiry:Date, /* unutulmus sifre belirtecinin sona erme tarihini sorgulama */
       verifyToken:String,/* belirtecin calıstıgını dogrulayın */
       verifyTokenExpiry:Date, /* belirtecinin sona erme tarihini sorgulama */
       

})

/* mongoose.models nesnesi, uygulamada daha önce tanımlanmış tüm modelleri içerir. Eğer User adlı bir model daha önce tanımlandıysa, bu model mongoose.models.User ifadesiyle elde edilir.
 */
const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;  /* User mongoose dan geliyor mantıklı bişey bu */
