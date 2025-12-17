"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Brand } from "./brand";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, ArrowRight } from "lucide-react";

const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/events", label: "Events" },
    { href: "/code-of-conduct", label: "Code of Conduct" },
    { href: "/contact", label: "Contact" },
];

function isActive(pathname: string, href: string) {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteNav() {
    const pathname = usePathname();

    return (
        <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-900/80 text-white backdrop-blur supports-[backdrop-filter]:bg-slate-900/60">
            <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
                {/* Brand */}
                <Link href="/" className="hover:opacity-90">
                    <Brand tone="onDark" />
                </Link>

                {/* Desktop navigation */}
                <nav className="hidden items-center gap-6 md:flex">
                    {links.map((l) => {
                        const active = isActive(pathname, l.href);
                        return (
                            <Link
                                key={l.href}
                                href={l.href}
                                className={[
                                    "text-sm font-medium transition-colors",
                                    active ? "text-white" : "text-white/80 hover:text-white",
                                ].join(" ")}
                            >
                                {l.label}
                            </Link>
                        );
                    })}

                    <Button
                        asChild
                        size="sm"
                        className="rounded-xl bg-white/10 text-white hover:bg-white/20"
                    >
                        <Link href="/join">Join</Link>
                    </Button>
                </nav>

                {/* Mobile navigation */}
                <div className="md:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                aria-label="Open menu"
                                className="border-white/20 bg-white/5 text-white hover:bg-white/10"
                            >
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>

                        {/* Mobile menu panel */}
                        <SheetContent
                            side="right"
                            className="w-[86vw] max-w-[360px] border-l border-white/10 bg-slate-950 text-white p-0"
                        >
                            {/* Top area */}
                            <div className="px-5 pt-5">
                                <SheetHeader className="text-left">
                                    <SheetTitle className="flex items-center gap-3">
                                        <Brand tone="onDark" />
                                    </SheetTitle>
                                </SheetHeader>

                                <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                                    <div className="text-sm font-semibold">Navigate</div>
                                    <div className="mt-1 text-xs text-white/70">
                                        Quick access to everything in the community.
                                    </div>
                                </div>
                            </div>

                            {/* Links (scroll-safe) */}
                            <nav className="mt-4 flex max-h-[calc(100dvh-220px)] flex-col gap-1 overflow-auto px-3 pb-6">
                                {links.map((l) => {
                                    const active = isActive(pathname, l.href);

                                    return (
                                        <SheetClose asChild key={l.href}>
                                            <Link
                                                href={l.href}
                                                className={[
                                                    "flex items-center justify-between rounded-xl px-3 py-3 text-sm font-medium transition",
                                                    active
                                                        ? "bg-white/10 text-white"
                                                        : "text-white/80 hover:bg-white/10 hover:text-white",
                                                ].join(" ")}
                                            >
                                                <span>{l.label}</span>
                                                <ArrowRight
                                                    className={[
                                                        "h-4 w-4 transition",
                                                        active ? "opacity-100" : "opacity-60",
                                                    ].join(" ")}
                                                />
                                            </Link>
                                        </SheetClose>
                                    );
                                })}

                                {/* Primary CTA */}
                                <div className="mt-3 px-1">
                                    <SheetClose asChild>
                                        <Button asChild className="w-full rounded-xl">
                                            <Link href="/join">Join the community</Link>
                                        </Button>
                                    </SheetClose>

                                    <div className="mt-2 text-center text-xs text-white/60">
                                        Built by the community • Tunisia JUG
                                    </div>
                                </div>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
