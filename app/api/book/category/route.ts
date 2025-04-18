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

export async function POST(request: Request) {
    try {
        const data = await request.json()
        console.log(data);
        const sql = `INSERT INTO categories (name, description, slug) VALUES (?, ?, ?);`
        const slug = data.name.toLowerCase().replace(/ /g, '-');
        const [result] = await db.query(sql, [data.name, data.description, slug]);
        console.log(result);
        const resultJSON = JSON.stringify(result)
        return new Response(resultJSON, {
            status: 200,
            statusText: 'Success',
        });
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify(error), { status: 500 });
    }
}