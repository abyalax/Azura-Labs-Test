"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpenText, LogIn, User, Atom } from "lucide-react";

export const routes = [
    { name: "Home", href: "/", icon: Home },
    { name: "Books", href: "/books", icon: BookOpenText },
    { name: "Categories", href: "/books/categories", icon: BookOpenText },
];

export default function Navbar() {
    const pathname = usePathname();
    return (
        <nav className="flex justify-between items-center gap-1 bg-white w-full px-10 py-6 rounded-3xl">

            <Atom size={44} />

            <div>
                {routes.map((item, index) => (
                    <button key={index} className={`px-3 py-1.5 cursor-pointer ${pathname === item.href ? "border-b-2 border-black" : ""}`}>
                        <Link href={item.href}>
                            {item.name}
                        </Link>
                    </button>
                ))}
            </div>

            <div className='flex gap-3'>
                <button className="px-3 py-1.5 bg-slate-600 text-white rounded-md flex justify-center items-center cursor-pointer">
                    <Link href="/" className='flex gap-3 items-center'>
                        <LogIn size={16} />
                        Login
                    </Link>
                </button>
                <button className="p-2 rounded-full border border-slate-300 flex justify-center items-center cursor-pointer">
                    <Link href="/">
                        <User size={22} color='black' />
                    </Link>
                </button>
            </div>

        </nav>
    );
}
