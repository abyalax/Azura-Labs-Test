import { getCategories } from "@/services/books"
import { Category } from "@/types"
import Table from "@/components/table/Table"
import columnsCategory from "@/components/table/columns/category"
import { FormCategory } from "@/components/form/form-category"

export default async function Page() {
    const categories = await getCategories() as Category[]
    return (
        <main>
            <div className="bg-white w-fit max-w-[80%] min-w-[60%] mx-auto rounded-2xl p-4">
                <div className="flex justify-between">
                    <h2>Category Managements</h2>
                    <FormCategory type="add"/>
                </div>
                <Table columns={columnsCategory} data={categories} />
            </div>
        </main>
    )
}