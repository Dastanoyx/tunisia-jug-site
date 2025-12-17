"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { Mail, ArrowUpRight, Sparkles, Handshake, Mic } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 14 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, ease: "easeOut" },
    },
};

export default function ContactPage() {
    return (
        <div className="relative">
            {/* ===== BACKDROP ===== */}
            <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                {/* creamy base */}
                <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,hsl(32_70%_98%)_0%,hsl(28_55%_96%)_35%,hsl(32_70%_97%)_70%,hsl(32_70%_98%)_100%)]" />
                {/* paper grain */}
                <div className="absolute inset-0 opacity-[0.14] [background:radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.05)_1px,transparent_0)] [background-size:56px_56px]" />
                {/* warm glows */}
                <div className="absolute -left-56 -top-72 h-[860px] w-[860px] rounded-full bg-[rgba(234,88,12,0.14)] blur-3xl" />
                <div className="absolute -right-64 top-10 h-[920px] w-[920px] rounded-full bg-[rgba(59,130,246,0.10)] blur-3xl" />
            </div>

            <div className="mx-auto max-w-6xl px-6 py-14 space-y-12">
                {/* ===== HEADER ===== */}
                <motion.div initial="hidden" animate="show" variants={fadeUp} className="space-y-4">
                    <div className="inline-flex items-center gap-2 rounded-full border bg-white/70 px-4 py-2 text-sm font-medium text-muted-foreground">
                        <Sparkles className="h-4 w-4 text-primary" />
                        Get in touch
                    </div>

                    <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
                        Let’s talk 👋
                    </h1>

                    <p className="max-w-2xl text-muted-foreground leading-relaxed">
                        Want to speak at a meetup, sponsor an event, host a venue, or just say hello?
                        Reach out — we’re friendly and we reply 🙂
                    </p>
                </motion.div>

                {/* ===== CONTACT CARD ===== */}
                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-120px" }}
                    variants={fadeUp}
                >
                    <Card className="relative overflow-hidden rounded-[calc(var(--radius)+1rem)] border border-black/10 bg-white/70 shadow-[0_24px_80px_-55px_rgba(0,0,0,0.45)]">
                        {/* subtle wash */}
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[rgba(234,88,12,0.10)] via-transparent to-[rgba(59,130,246,0.08)]" />

                        <CardHeader className="relative">
                            <CardTitle className="text-base flex items-center gap-2">
                                <Mail className="h-4 w-4 text-primary" />
                                Email contact
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="relative space-y-6 text-sm text-muted-foreground">
                            <div className="space-y-1">
                                <div>
                                    <span className="font-medium text-foreground">Organizer email:</span>
                                </div>
                                <div className="flex flex-wrap items-center gap-2">
                                    <a
                                        href="mailto:Yasinghariani@outlook.fr"
                                        className="inline-flex items-center gap-2 rounded-xl border border-primary/50 bg-white/70 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10"
                                    >
                                        <Mail className="h-4 w-4" />
                                        Yasinghariani@outlook.fr
                                    </a>
                                </div>
                            </div>

                            <div className="rounded-xl border border-black/10 bg-white/60 p-4 text-xs leading-relaxed">
                                💡 <span className="font-medium text-foreground">Note:</span>
                                This is a temporary email address while the community is growing.
                                A dedicated <span className="font-medium">@tunisiajug.org</span> address will be added soon.
                            </div>

                            {/* ===== USE CASES ===== */}
                            <div className="grid gap-4 md:grid-cols-3">
                                {[
                                    {
                                        icon: Mic,
                                        title: "Speak",
                                        text: "Propose a talk or lightning session — beginners welcome.",
                                    },
                                    {
                                        icon: Handshake,
                                        title: "Sponsor / host",
                                        text: "Support with a venue, snacks, or community resources.",
                                    },
                                    {
                                        icon: Sparkles,
                                        title: "Community ideas",
                                        text: "Suggest topics, formats, or collaborations.",
                                    },
                                ].map((b) => {
                                    const Icon = b.icon;
                                    return (
                                        <div
                                            key={b.title}
                                            className="rounded-[calc(var(--radius)+0.6rem)] border border-black/10 bg-white/65 p-4"
                                        >
                                            <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl border bg-white/70">
                                                <Icon className="h-4 w-4 text-primary" />
                                            </div>
                                            <div className="pt-2 text-sm font-semibold">{b.title}</div>
                                            <p className="pt-1 text-sm text-muted-foreground leading-relaxed">
                                                {b.text}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* ===== CTA ===== */}
                            <div className="flex flex-wrap gap-3 pt-2">
                                <a
                                    href="mailto:Yasinghariani@outlook.fr"
                                    className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                                >
                                    Send an email <ArrowUpRight className="ml-2 h-4 w-4" />
                                </a>

                                <Link
                                    href="/about"
                                    className="inline-flex items-center justify-center rounded-xl border border-primary/60 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10"
                                >
                                    Learn about the community
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}
