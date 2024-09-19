import {NextResponse} from "next/server";
import {db} from "../../../../database/database";
import {demo} from "../../../../database/schemas";

// THIS IS JUST AN EXAMPLE, DO NOT USE IT
export async function GET(request: Request, {params}: { slug: string }) {
    const demoResponse = await db.insert(demo).values({value: params.slug}).returning();
    return NextResponse.json(demoResponse);
}