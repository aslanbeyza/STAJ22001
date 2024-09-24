import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// GET adlı bir fonksiyon tanımlanıyor ve bu fonksiyon bir API isteğine yanıt olarak çalışacak.
export async function GET() {
    try {
        const cookieStore = cookies();
        cookieStore.delete('token');
        const response = NextResponse.json({
            message: "Logout successful",
            success: true,
        })
        console.log("cıkıs yapıldı" + response);
        response.cookies.set("token", "", {httpOnly: true, expires: new Date(0)});
        return response;

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

// POST adlı bir fonksiyon tanımlanıyor
export async function POST() {
    try {
        const cookieStore = cookies();
        cookieStore.delete('token');
        const response = NextResponse.json({
            message: "Logout successful",
            success: true,
        })
        response.cookies.set("token", "", {httpOnly: true, expires: new Date(0)});
        return response;

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
