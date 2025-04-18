import { db } from "@/lib/db";
import { FieldPacket, RowDataPacket } from "mysql2/promise";

export async function GET() {
    try {

        const [results]: [RowDataPacket[], FieldPacket[]] = await db.query(
            'SELECT MIN(publishAt) AS minDate, MAX(publishAt) AS maxDate FROM books'
        );
        console.log(results);
        const range = {
            from: results[0].minDate ? new Date(results[0].minDate) : null,
            to: results[0].maxDate ? new Date(results[0].maxDate) : null
        };
        return new Response(JSON.stringify(range), { status: 200 });
    } catch (err) {
        console.log(err);
        return new Response(JSON.stringify(err), { status: 500 });
    }
}