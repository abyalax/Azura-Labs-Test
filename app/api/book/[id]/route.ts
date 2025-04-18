import { db } from "@/lib/db";
import { FieldPacket, RowDataPacket } from "mysql2/promise";

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params
        const [results]: [RowDataPacket[], FieldPacket[]] = await db.query('DELETE FROM books WHERE id = ?;', [id])
        console.log(results);
        if (results.length == 0) {
            return new Response(JSON.stringify({ message: "Book not found" }), { status: 404 });
        }
        return new Response(JSON.stringify(results), { status: 200 });
    } catch (err) {
        console.log(err);
        return new Response(JSON.stringify(err), { status: 500 });
    }
}