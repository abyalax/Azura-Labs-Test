import { FormBook } from "@/components/form/form-book";

export default function Page() {
    return (
        <main>
            <div className="bg-white w-fit min-w-[40vw] mx-auto rounded-2xl p-4">
                <FormBook type="add"/>
            </div>
        </main>
    )
}