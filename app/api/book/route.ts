import { db } from "@/lib/db"
import { format } from "date-fns";
import { FieldPacket, RowDataPacket } from "mysql2/promise";

export async function POST(request: Request) {
  try {
    const data = await request.json()
    console.log(data);
    const findCategory: [RowDataPacket[], FieldPacket[]] = await db.query(
      'SELECT id FROM categories WHERE name = ?',
      [data.category]
    )
    const category_id = findCategory[0][0].id
    console.log('find id category: ', category_id);
    const publish_at = data.publishAt ? format(new Date(data.publishAt), 'yyyy-MM-dd HH:mm:ss') : null;
    const sql =
      `INSERT INTO books
        (title, author, status, publisher, publishAt, price, pages, category_id) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?);`
    const [result, fields] = await db.query(sql, [
      data.title,
      data.author,
      data.status,
      data.publisher,
      publish_at,
      data.price,
      data.pages,
      category_id
    ]);
    console.log(result);
    console.log(fields);
    return new Response(JSON.stringify({
      message: "Success POST ",
      data
    }), { status: 200 })

  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify(err), { status: 500 })
  }
}
export async function PUT(request: Request) {
  try {
    const data = await request.json();

    if (!data.id) {
      return new Response(JSON.stringify({ message: "Missing book ID." }), { status: 400 });
    }

    const [findCategory]: [RowDataPacket[], FieldPacket[]] = await db.query(
      'SELECT id FROM categories WHERE name = ?',
      [data.category]
    );

    if (findCategory.length === 0) {
      return new Response(JSON.stringify({ message: "Category not found." }), { status: 404 });
    }

    const category_id = findCategory[0].id;
    const publish_at = data.publishAt
      ? format(new Date(data.publishAt), "yyyy-MM-dd HH:mm:ss")
      : null;

    const sql = `
          UPDATE books SET
            title = ?,
            author = ?,
            status = ?,
            publisher = ?,
            publishAt = ?,
            price = ?,
            pages = ?,
            category_id = ?
          WHERE id = ?;
        `;

    const [result] = await db.query(sql, [
      data.title,
      data.author,
      data.status,
      data.publisher,
      publish_at,
      data.price,
      data.pages,
      category_id,
      data.id,
    ]);

    return new Response(JSON.stringify({
      message: "Book updated successfully.",
      data: result,
    }), { status: 200 });

  } catch (err) {
    console.error("Update error:", err);
    return new Response(JSON.stringify({ message: "Internal server error", error: err }), { status: 500 });
  }
}
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    if (!id) return new Response(JSON.stringify({ message: "Missing book ID." }), { status: 400 });
    const [result] = await db.query('DELETE FROM books WHERE id = ?;', [id]);
    return new Response(JSON.stringify({ message: "Book deleted successfully.", data: result }), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify(err), { status: 500 });
  }
}