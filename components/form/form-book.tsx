"use client"

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CalendarIcon, Plus } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { bookSchema } from "@/validation/book"
import { useEffect, useRef, useState } from "react"
import { Book } from "@/types"
import { toast } from "sonner"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"

interface FormBookProps {
    defaultValues?: Book
    type: "add" | "edit"
}

export const FormBook = ({ defaultValues, type }: FormBookProps) => {
    const [categories, setCategories] = useState<string[]>([])
    const [category, setCategory] = useState('')
    const categoryName = useRef<HTMLInputElement>(null);
    const categoryDescription = useRef<HTMLInputElement>(null);
    const router = useRouter()
    const form = useForm<z.infer<typeof bookSchema>>({
        resolver: zodResolver(bookSchema),
        defaultValues: defaultValues ?? {
            title: "",
            category: "",
            status: "unpublish",
            author: "",
            publishAt: undefined,
            publisher: "",
            price: 0,
            pages: 1
        }
    })

    useEffect(() => {
        const fetchData = async () => {
            await fetch('/api/book/category/unique', { method: 'GET' })
                .then(res => res.json())
                .then(data => setCategories(data))
        }
        const fetchCategory = async () => {
            await fetch(`/api/book/category/${defaultValues?.category_id}`, { method: 'GET' })
                .then(res => res.json())
                .then(data => setCategory(data[0].name))
        }
        fetchData()
        if (defaultValues) {
            fetchCategory()
        }
        return () => setCategories([]);
    }, [defaultValues]);

    async function onSubmit(values: z.infer<typeof bookSchema>) {
        if (type === 'add') {
            const res = await fetch('/api/book', {
                method: 'POST',
                body: JSON.stringify(values)
            })
            const resJson = await res.json()
            console.log({ resJson });
            if (res.status === 200) {
                toast('Book added successfully.')
                router.push('/books')
            } else {
                toast('Book added failed.', { style: {
                        backgroundColor: 'red',
                        color: 'white'
                    }
                })
            }
        } else {
            const res = await fetch('/api/book', {
                method: 'PUT',
                body: JSON.stringify(values)
            })
            const resJson = await res.json()
            console.log({ resJson });
            if (res.status === 200) {
                toast('Book updated successfully.')
                router.push('/books')
            } else {
                toast('Book updated failed.', { style: {
                        backgroundColor: 'red',
                        color: 'white'
                    }
                })
            }
        }
    }

    const hanldeAddNewCategory = async () => {
        const category = {
            name: categoryName.current?.value,
            description: categoryDescription.current?.value
        }
        if (category) {
            const schema = z.object({
                name: z.string().min(4).max(18),
                description: z.string().min(10).max(40),
            })
            const result = schema.safeParse(category)
            console.log({ result });
            if (!result.success) {
                toast('Category must be at most 18 characters.', {
                    style: {
                        backgroundColor: 'red',
                        color: 'white'
                    }
                })
                return
            }
            const res = await fetch('/api/book/category', {
                method: 'POST',
                body: JSON.stringify(category)
            })
            const resJson = await res.json()
            console.log({ resJson });
            if (res.status === 200) {
                toast('Category added successfully.')
            } else {
                toast('Failed to add category.')
            }
        } else {
            console.log('newCategory is empty');
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Book Title..." {...field} />
                            </FormControl>
                            <FormDescription>
                                Title at cover book
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Category</FormLabel>
                            <div className="flex w-full max-w-sm items-center space-x-2">
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <div>{category ? category : "Select Category"}</div>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {categories.map((category, index) => (
                                            <SelectItem key={index} value={category}>{category}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Popover>
                                    <PopoverTrigger>
                                        <div className="cursor-pointer flex gap-2 items-center px-3 py-2 bg-gray-200 rounded-md text-black text-xs font-semibold">
                                            <Plus size={16} />
                                            Add New
                                        </div>
                                    </PopoverTrigger>
                                    <PopoverContent className="flex flex-col  gap-2">
                                        <div className="grid gap-4">
                                            <div className="space-y-2">
                                                <h4 className="font-medium leading-none">Category Form</h4>
                                                <p className="text-sm text-muted-foreground">
                                                    Add a new category
                                                </p>
                                            </div>
                                            <div className="grid gap-2">
                                                <div className="grid grid-cols-3 items-center gap-4">
                                                    <Label htmlFor="name">Name</Label>
                                                    <Input
                                                        ref={categoryName}
                                                        placeholder="Category name..."
                                                        id="name"
                                                        className="col-span-2 h-8"
                                                    />
                                                </div>
                                                <div className="grid grid-cols-3 items-center gap-4">
                                                    <Label htmlFor="maxWidth">Description</Label>
                                                    <Input
                                                        placeholder="Description..."
                                                        ref={categoryDescription}
                                                        id="maxWidth"
                                                        className="col-span-2 h-8"
                                                    />
                                                </div>
                                                <Button type="button" className="w-fit" onClick={hanldeAddNewCategory} variant={"outline"}>
                                                    <Plus size={20} />
                                                    add
                                                </Button>
                                            </div>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="author"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Author</FormLabel>
                            <FormControl>
                                <Input placeholder="Author Books..." {...field} />
                            </FormControl>
                            <FormDescription>
                                Make sure author is valid
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="pages"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Pages Book</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="Number of page book..." {...field} />
                            </FormControl>
                            <FormDescription>
                                Make sure pages is valid
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Price Book</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="Price book..." {...field} />
                            </FormControl>
                            <FormDescription>
                                Make sure price is valid
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                        <FormItem>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormLabel>Status</FormLabel>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select status publish book" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="publish">Has Been Published</SelectItem>
                                    <SelectItem value="unpublish">Not yet Publish</SelectItem>
                                    <SelectItem value="draft">Still in Draft</SelectItem>
                                </SelectContent>
                            </Select>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="publisher"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Publisher</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="Publisher book..." {...field} />
                            </FormControl>
                            <FormDescription>
                                Make sure publisher is valid
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="publishAt"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Publish At</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-[240px] justify-start text-left font-normal",
                                            !field.value && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon />
                                        {field.value ? format(field.value, "PPP") : <span>Pick a Date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormDescription>
                                Your date of birth is used to calculate your age.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}