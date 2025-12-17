import Link from "next/link";
import { site } from "@/content/site";
import {
    ArrowUpRight,
    Coffee,
    Globe2,
    Mail,
    MapPin,
    ShieldCheck,
    Sparkles,
} from "lucide-react";

export function SiteFooter() {
    return (
        <footer className="relative overflow-hidden border-t bg-gradient-to-b from-[hsl(32_70%_98%)] via-[hsl(28_55%_96%)] to-[hsl(32_70%_98%)]">
            {/* background texture + subtle glows */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 opacity-[0.14] [background:radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.05)_1px,transparent_0)] [background-size:58px_58px]" />
                <div className="absolute -left-48 -top-56 h-[560px] w-[560px] rounded-full bg-[rgba(234,88,12,0.12)] blur-3xl" />
                <div className="absolute -right-56 top-10 h-[680px] w-[680px] rounded-full bg-[rgba(59,130,246,0.10)] blur-3xl" />
            </div>

            <div className="relative mx-auto max-w-6xl px-6 py-14">
                {/* ===== TOP STRIP ===== */}
                <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div className="inline-flex items-center gap-2 rounded-full border bg-white/70 px-4 py-2 text-sm font-medium text-muted-foreground">
                        <Globe2 className="h-4 w-4 text-primary" />
                        Part of the worldwide Java community
                    </div>

                    <div className="inline-flex items-center gap-2 rounded-full border bg-white/70 px-4 py-2 text-sm font-medium text-muted-foreground">
                        <Sparkles className="h-4 w-4 text-primary" />
                        Community-run • Talks • Meetups • Learning
                    </div>
                </div>

                <div className="grid gap-10 md:grid-cols-3">
                    {/* Brand */}
                    <div className="space-y-3">
                        <div className="inline-flex items-center gap-2 rounded-full border bg-white/70 px-4 py-2 text-sm font-semibold">
                            <Coffee className="h-4 w-4 text-primary" />
                            {site.name}
                        </div>

                        <p className="text-sm text-muted-foreground leading-relaxed">{site.tagline}</p>

                        <div className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            {site.city}
                        </div>
                    </div>

                    {/* Links */}
                    <div className="space-y-3">
                        <div className="text-sm font-semibold">Explore</div>

                        <div className="flex flex-wrap gap-2">
                            <Link
                                href="/events"
                                className="group inline-flex items-center gap-1 rounded-full border bg-white/60 px-3 py-1.5 text-sm text-muted-foreground transition hover:bg-white/80 hover:text-foreground"
                            >
                                Events
                                <ArrowUpRight className="h-4 w-4 opacity-0 transition group-hover:opacity-100" />
                            </Link>

                            <Link
                                href="/about"
                                className="group inline-flex items-center gap-1 rounded-full border bg-white/60 px-3 py-1.5 text-sm text-muted-foreground transition hover:bg-white/80 hover:text-foreground"
                            >
                                About
                                <ArrowUpRight className="h-4 w-4 opacity-0 transition group-hover:opacity-100" />
                            </Link>

                            <Link
                                href="/join"
                                className="group inline-flex items-center gap-1 rounded-full border bg-white/60 px-3 py-1.5 text-sm text-muted-foreground transition hover:bg-white/80 hover:text-foreground"
                            >
                                Join
                                <ArrowUpRight className="h-4 w-4 opacity-0 transition group-hover:opacity-100" />
                            </Link>

                            <Link
                                href="/code-of-conduct"
                                className="group inline-flex items-center gap-1 rounded-full border bg-white/60 px-3 py-1.5 text-sm text-muted-foreground transition hover:bg-white/80 hover:text-foreground"
                            >
                                Code of Conduct
                                <ArrowUpRight className="h-4 w-4 opacity-0 transition group-hover:opacity-100" />
                            </Link>

                            <Link
                                href="/contact"
                                className="group inline-flex items-center gap-1 rounded-full border bg-white/60 px-3 py-1.5 text-sm text-muted-foreground transition hover:bg-white/80 hover:text-foreground"
                            >
                                Contact
                                <ArrowUpRight className="h-4 w-4 opacity-0 transition group-hover:opacity-100" />
                            </Link>
                        </div>
                    </div>

                    {/* Contact */}
                    <div className="space-y-3">
                        <div className="text-sm font-semibold">Contact</div>

                        <div className="space-y-2 text-sm text-muted-foreground">
                            <div className="inline-flex items-start gap-2">
                                <Mail className="mt-0.5 h-4 w-4" />
                                <div className="space-y-1">
                                    <div>
                                        Email:{" "}
                                        <a
                                            href="mailto:Yasinghariani@outlook.fr"
                                            className="font-medium text-foreground underline underline-offset-4 hover:opacity-90"
                                        >
                                            Yasinghariani@outlook.fr
                                        </a>
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                        Temporary email — we’ll publish an official community address soon.
                                    </div>
                                </div>
                            </div>

                            <div className="text-xs">
                                Founded by{" "}
                                {site.organizer.profileUrl ? (
                                    <a
                                        className="underline underline-offset-4 text-foreground hover:opacity-90"
                                        href={site.organizer.profileUrl}
                                    >
                                        {site.organizer.name}
                                    </a>
                                ) : (
                                    <span className="text-foreground">{site.organizer.name}</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Premium divider */}
                <div className="mt-10 h-px w-full bg-gradient-to-r from-transparent via-black/15 to-transparent" />

                {/* Bottom bar */}
                <div className="mt-6 flex flex-col gap-3 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
                    <div>
                        © {new Date().getFullYear()} {site.shortName}. Community-run.
                    </div>

                    <div className="inline-flex items-center gap-2 md:justify-end">
                        <ShieldCheck className="h-4 w-4 text-primary"/>
                        <span>
                            Part of the worldwide Java User Group (JUG) community.
                        </span>
                    </div>

                </div>
            </div>
        </footer>
    );
}
