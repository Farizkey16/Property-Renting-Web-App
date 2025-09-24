import { cookies } from "next/headers";
import { verify } from 'jsonwebtoken'

type JwtPayload = {
  userId: string;
  role: string;
  iat: number;
  exp: number;
};

export const getCurrentUser = async (): Promise<JwtPayload | null> => {
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value

    if (!token) {
        throw new Error("Token not found on cookies.")
    }

    try {
        const decoded = verify(token, process.env.TOKEN_KEY!) as JwtPayload
        return decoded
        
    } catch (error) {
        console.log("JWT Verification Error:", error);
        return null
    }
    
}