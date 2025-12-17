"use client";

import Link from "next/link";
import { Brand } from "./brand";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/events", label: "Events" },
    { href: "/code-of-conduct", label: "Code of Conduct" },
    { href: "/contact", label: "Contact" },
];

export function SiteNav() {
    return (
        <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-800/90 text-white backdrop-blur">
            <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
                <Link href="/" className="hover:opacity-90">
                    <Brand tone="onDark" />
                </Link>

                <nav className="hidden items-center gap-6 md:flex">
                    {links.map((l) => (
                        <Link
                            key={l.href}
                            href={l.href}
                            className="text-sm font-medium text-white/80 transition-colors hover:text-white"
                        >
                            {l.label}
                        </Link>
                    ))}

                    <Button
                        asChild
                        size="sm"
                        className="rounded-xl bg-white/10 text-white hover:bg-white/20"
                    >
                        <Link href="/join">Join</Link>
                    </Button>
                </nav>

                <div className="md:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                aria-label="Open menu"
                                className="border-white/20 bg-white/5 text-white hover:bg-white/10"
                            >
                                <Menu className="h-4 w-4" />
                            </Button>
                        </SheetTrigger>

                        <SheetContent side="right" className="w-80">
                            <div className="mb-6">
                                <Brand />
                            </div>

                            <div className="flex flex-col gap-2">
                                {links.map((l) => (
                                    <Button key={l.href} asChild variant="ghost" className="justify-start">
                                        <Link href={l.href}>{l.label}</Link>
                                    </Button>
                                ))}

                                <Button asChild className="mt-2">
                                    <Link href="/join">Join</Link>
                                </Button>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
