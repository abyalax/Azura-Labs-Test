import { db } from "@/lib/db";
import { FieldPacket, RowDataPacket } from "mysql2/promise";

export async function GET() {
    try {
        const [results]: [RowDataPacket[], FieldPacket[]] = await db.query(
            'SELECT DISTINCT name FROM categories',
        );
        const data = results.map((item) => item.name);
        return new Response(JSON.stringify(data));
    } catch (err) {
        console.log(err);
        return new Response(JSON.stringify(err), { status: 500 });
    }
}