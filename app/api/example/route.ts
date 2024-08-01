import {NextResponse} from "next/server";
import {db} from "../../../database/database";
import {demo} from "../../../database/schemas";

// THIS IS JUST AN EXAMPLE, DO NOT USE IT
export async function GET(request: Request) {
    const demoResponse = await db.select().from(demo);
    return NextResponse.json(demoResponse);
}