import { FormCategory } from "@/components/form/form-category"
import { getCategoryByID } from "@/services/books"
import { Category } from "@/types"

export default async function Page({ params }: { params: Promise<{ id: number }> }) {

    const { id } = await params
    const category = await getCategoryByID(id) as Category

    if (category) {
        return (
            <main>
                <div className="bg-white w-fit min-w-[40vw] mx-auto rounded-2xl p-4">
                    <FormCategory type="edit" defaultValues={category} />
                </div>
            </main>
        )
    } else {
        return (
            <main>
                <div className="bg-white w-fit min-w-[40vw] mx-auto rounded-2xl p-4">
                    <p>Category not found</p>
                </div>
            </main>
        )
    }
}