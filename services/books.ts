import { db } from "@/lib/db";
import { Category } from "@/types";
import { FieldPacket, RowDataPacket } from "mysql2";

export const getBooks = async () => {
    try {
        const [results]: [RowDataPacket[], FieldPacket[]]  = await db.query(
            `SELECT
                book.id,
                book.status,
                book.title,
                book.author,
                book.publisher,
                book.publishAt,
                book.price,
                book.pages,
                category.name AS category
            FROM
                books AS book
            JOIN
                categories AS category ON book.category_id = category.id;`,
        );
        console.log(results);
        return results
    } catch (err) {
        console.log(err);
    }
}
export const getCategories = async () => {
    try {
        const [results]: [RowDataPacket[], FieldPacket[]]  = await db.query(
            'SELECT id ,name, description, slug FROM categories',
        );
        console.log(results);
        return results
    } catch (err) {
        console.log(err);
    }
}
export const getCategoryNames = async () => {
    try {
        const [rows]: [RowDataPacket[], FieldPacket[]]  = await db.query('SELECT DISTINCT name FROM categories;');
        const typedRows = rows as { name: string }[];
        return typedRows.map((item) => item.name);
    } catch (err) {
        console.log(err);
    }
}
export const getBooksByCategory = async (slug: string) => {
    try {

        const [rows]: [RowDataPacket[], FieldPacket[]] = await db.query(
            'SELECT * FROM categories WHERE slug = ?',
            [slug]
        );
        const category = rows[0] as Category
        const [results] = await db.query(
            'SELECT * FROM books WHERE category_id = ?',
            [category.id]
        );
        console.log(results);
        return results
    } catch (err) {
        console.log(err);
    }
}
export const getBookByID = async (id: number) => {
    try {
        const [results]: [RowDataPacket[], FieldPacket[]] = await db.query('SELECT * FROM books WHERE id = ?', [id]);
        return results[0]
    } catch (error) {
        console.log(error);
    }
}
export const getCategoryByID = async (id: number) => {
    try {
        const [results]: [RowDataPacket[], FieldPacket[]]  = await db.query('SELECT * FROM categories WHERE id = ?', [id]);
        console.log(results);
        return results[0]
    } catch (error) {
        console.log(error);
    }

}