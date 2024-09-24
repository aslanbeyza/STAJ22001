import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "../../../../models/userModel";
import { connect } from "@/dbConfig/dbConfig";

// Veritabanı bağlantısı
connect();

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        console.log("userId:", userId); // Log ekleyin
        const user = await User.findOne({ _id: userId }).select("-password");
        console.log("user:", user); // Log ekleyin
        if (!user) {
            return NextResponse.json({ message: "Kullanıcı bulunamadı" }, { status: 404 });
        }
        return NextResponse.json({
            message: "Kullanıcı bulundu",
            data: user
        });
    } catch (error: any) {
        console.error("Error:", error); // Log ekleyin
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        console.log("userId:", userId); // Log ekleyin
        const updatedUser = await User.findOneAndUpdate(
            { _id: userId },
            { isVerified: true },
            { new: true }
        ).select("-password");
        console.log("updatedUser:", updatedUser); // Log ekleyin

        if (!updatedUser) {
            return NextResponse.json({ message: "Kullanıcı bulunamadı" }, { status: 404 });
        }

        return NextResponse.json({
            message: "Kullanıcı başarıyla güncellendi",
            data: updatedUser
        });
    } catch (error: any) {
        console.error("Error:", error); // Log ekleyin
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
