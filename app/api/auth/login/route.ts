import {NextResponse} from "next/server";
import {SignJWT} from "jose";
import {db} from "../../../../database/database";
import {employees} from "../../../../database/schemas";
import {eq} from "drizzle-orm";

if (
    !process.env.JWT_SECRET
) {
    throw new Error("Missing required environment variables");
}

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(request: Request) {
    try {
        const {username, password} = await request.json();
        return NextResponse.json({success: true}, {status: 200});
        const employee = await db.select().from(employees).where(eq(employees.username, username)).limit(1);

        if (!employee[0]) {
            return NextResponse.json(
                {error: "Invalid credentials"},
                {status: 401}
            );
        }
        if (!username || !password) {
            return NextResponse.json(
                {error: "Missing credentials"},
                {status: 400}
            );
        }
        //first login only
        if (!employee[0].password) {
            await db.update(employees).set({...employee, password}).where(eq(employees.username, username));
        } else {
            //check if employee passwords match
        }

        const token = await new SignJWT({
            username,
        })
            .setProtectedHeader({alg: "HS256"})
            .setExpirationTime("12h")
            .setIssuedAt()
            .sign(new TextEncoder().encode(JWT_SECRET));

        const response = NextResponse.json({success: true}, {status: 200});

        response.cookies.set({
            name: "token",
            value: token,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 12,
        });

        return response;
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json({error: "Invalid request"}, {status: 400});
    }
}
