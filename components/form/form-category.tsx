"use client"

import { Form, FormField } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
import { categorySchema } from "@/validation/category"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Category } from "@/types"

interface FormCategoryProps {
    defaultValues?: Category
    type: "add" | "edit"
}

export const FormCategory = ({ defaultValues, type }: FormCategoryProps) => {
    const router = useRouter()
    const form = useForm<z.infer<typeof categorySchema>>({
        resolver: zodResolver(categorySchema),
        defaultValues: defaultValues ?? {
            name: "",
            description: ""
        }
    })

    async function onSubmit(values: z.infer<typeof categorySchema>) {
        const res = await fetch('/api/book/category', {
            method: 'POST',
            body: JSON.stringify(values)
        })
        const resJson = await res.json()
        console.log({ resJson });
        if (res.status === 200) {
            toast(`Category ${type === 'add' ? 'added' : 'updated'} successfully.`)
            router.push('/books')
        } else {
            toast(`Category ${type === 'add' ? 'added' : 'updated'} failed.`, {
                style: {
                    backgroundColor: 'red',
                    color: 'white'
                }
            })
        }

    }

    if (type === 'add') {
        return (
            <Popover>
                <PopoverTrigger>
                    <div className="cursor-pointer flex gap-2 items-center px-3 py-2 border border-gray-200 hover:bg-gray-100 rounded-md text-black text-xs font-semibold">
                        <Plus size={16} />
                        Add New
                    </div>
                </PopoverTrigger>
                <PopoverContent className="flex flex-col gap-2">
                    <div className="grid gap-4">
                        <div className="space-y-2">
                            <h4 className="font-medium leading-none">Category Form</h4>
                            <p className="text-sm text-muted-foreground">
                                Add a new category
                            </p>
                        </div>
                        <div className="grid gap-2">

                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <div className="grid grid-cols-3 items-center gap-4">
                                                <Label htmlFor="name">Name</Label>
                                                <Input
                                                    placeholder="Category name..."
                                                    id="name"
                                                    {...field}
                                                    className="col-span-2 h-8"
                                                />
                                            </div>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="description"
                                        render={({ field }) => (
                                            <div className="grid grid-cols-3 items-center gap-4">
                                                <Label htmlFor="maxWidth">Description</Label>
                                                <Input
                                                    placeholder="Description..."
                                                    id="maxWidth"
                                                    {...field}
                                                    className="col-span-2 h-8"
                                                />
                                            </div>
                                        )}
                                    />
                                    <Button type="submit" className="w-fit" variant={"outline"}>
                                        <Plus size={20} />
                                        add
                                    </Button>
                                </form>
                            </Form>

                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        )
    } else {
        return (
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <div className="grid grid-cols-3 items-center gap-4">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    placeholder="Category name..."
                                    id="name"
                                    {...field}
                                    className="col-span-2 h-8"
                                />
                            </div>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <div className="grid grid-cols-3 items-center gap-4">
                                <Label htmlFor="maxWidth">Description</Label>
                                <Input
                                    placeholder="Description..."
                                    id="maxWidth"
                                    {...field}
                                    className="col-span-2 h-8"
                                />
                            </div>
                        )}
                    />
                    <Button type="submit" className="w-fit" variant={"outline"}>
                        <Plus size={20} />
                        Update
                    </Button>
                </form>
            </Form >
        )
    }
}