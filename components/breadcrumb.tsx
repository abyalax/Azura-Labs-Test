"use client"

import { Breadcrumb as Container, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { routes } from "./navbar"
import { Fragment } from "react"
import { usePathname } from "next/navigation";

export default function Breadcrumb() {
    const pathname = usePathname();
    return (
        <Container>
            <BreadcrumbList>
                {routes.map((item, index) => (
                    <Fragment key={index}>
                        <BreadcrumbItem>
                        {pathname === item.href ? (
                            <BreadcrumbPage>{item.name}</BreadcrumbPage>
                        ) : (
                            <BreadcrumbLink href={item.href}>{item.name}</BreadcrumbLink>
                        )}
                        </BreadcrumbItem>

                        <BreadcrumbSeparator />
                    </Fragment>
                ))}

            </BreadcrumbList>
        </Container>
    )
}