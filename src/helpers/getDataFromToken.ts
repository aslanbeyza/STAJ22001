//tokendan veri alma işlemi
import {NextRequest} from "next/server";
import jwt from "jsonwebtoken";
/* JWT (JSON Web Token) ile kimliği doğrulanmış bir kullanıcının kimliğini (ID'sini) almak için kullanılır. */

//jeton verilerini alma.
export const getDataFromToken = (request: NextRequest)=> {
      try {
      const token= request.cookies.get("token")?.value || '';
    const decodedToken:any =  jwt.verify(token, process.env.TOKEN_SECRET!);
    return decodedToken.id;
      }catch (error:any){
          throw new Error (error.message);
      }
}