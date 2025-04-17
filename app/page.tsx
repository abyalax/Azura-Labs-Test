"use client"

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { SquareLibrary, SquareMousePointer } from "lucide-react"
import Link from "next/link"
import Navbar from "../components/navbar";

export default function Home() {

  return (
    <main className="bg-[#f4f5f9] min-h-screen w-full p-8">
      <Navbar />
      <div className="w-full h-full flex justify-center items-center gap-4 p-6">
        <Card>
          <CardHeader>
            <CardTitle>Management Books</CardTitle>
            <CardDescription>See all your data books</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center items-center flex-col gap-3">
            <SquareLibrary size={50} />
            <Button>
              <Link href={"/books"}>
                Go to Books Manager
              </Link>
            </Button>
          </CardContent>
          <CardFooter>
            <p className="text-sm">Visualize with Table Interactive</p>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Management Categories</CardTitle>
            <CardDescription>See all your data categories</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center items-center flex-col gap-3">
            <SquareMousePointer size={50} />
            <Button>
              <Link href={"/books"}>
                Go to Category Manager
              </Link>
            </Button>
          </CardContent>
          <CardFooter>
            <p className="text-sm">Visualize with Table Interactive</p>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
