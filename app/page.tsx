"use client";

import Link from "next/link";
import { site } from "@/content/site";
import { events } from "@/content/events";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import {
    CalendarDays,
    Handshake,
    Mic2,
    Sparkles,
    Users2,
    Zap,
    ArrowRight,
} from "lucide-react";

function formatDate(iso: string) {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 14 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, ease: "easeOut" },
    },
};

export default function Home() {
    const next = events.find((e) => e.status === "upcoming") ?? null;

    return (
        <div className="relative">
            {/* ==================== */}
            <section className="relative w-full overflow-hidden bg-gradient-to-r from-[hsl(28_85%_94%)] via-[hsl(32_70%_96%)] to-[hsl(28_85%_94%)]">
                {/* background texture & glow */}
                <div className="pointer-events-none absolute inset-0">
                    {/* grain */}
                    <div className="absolute inset-0 opacity-[0.25] [background:radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.06)_1px,transparent_0)] [background-size:34px_34px]" />

                    {/* warm glows */}
                    <div className="absolute -top-40 left-[-220px] h-[700px] w-[700px] rounded-full bg-[hsl(28_85%_55%/0.22)] blur-3xl" />
                    <div className="absolute top-32 right-[-260px] h-[760px] w-[760px] rounded-full bg-[hsl(36_45%_94%/0.95)] blur-3xl" />
                </div>

                {/* centered content */}
                <div className="relative mx-auto max-w-6xl px-6 py-20">
                    <div className="grid gap-10 md:grid-cols-2">
                        {/* LEFT */}
                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            animate="show"
                            className="space-y-6"
                        >
                            <div className="flex flex-wrap items-center gap-8">
                                <div className="relative h-16 w-16">
                                    <Image
                                        src="/logo.svg"
                                        alt="Tunisia Java User Group"
                                        fill
                                        className="object-cover scale-[1.30] rounded-full"
                                    />
                                </div>

                                <span className="rounded-full border bg-white/70 px-6 py-3 text-lg font-semibold">
                                    {site.city}
                                </span>

                                <span className="rounded-full px-6 py-3 text-lg font-semibold text-primary">
                                    Community-led
                                </span>
                            </div>

                            <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
                                {site.name}
                            </h1>

                            <p className="max-w-xl text-lg text-muted-foreground">
                                {site.tagline}
                            </p>

                            <div className="flex gap-4">
                                <Button
                                    asChild
                                    size="lg"
                                    variant="outline"
                                    className="rounded-xl border-primary/60 text-primary hover:bg-primary/10"
                                >
                                    <Link href="/join">Join the community</Link>
                                </Button>

                                <Button
                                    asChild
                                    size="lg"
                                    variant="outline"
                                    className="rounded-xl border-primary/60 text-primary hover:bg-primary/10"
                                >
                                    <Link href="/events">See events</Link>
                                </Button>
                            </div>


                            <div className="flex flex-wrap items-center gap-3 text-sm">
                                <span className="inline-flex items-center gap-2 rounded-full border bg-white/65 px-3 py-1.5 text-muted-foreground">
                                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                                        ✦
                                    </span>
                                    Founded by{" "}
                                    <span className="font-semibold text-foreground">
                                        {site.organizer.name}
                                    </span>
                                </span>

                                <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/55 px-3 py-1.5 text-muted-foreground">
                                    Built in public • Powered by the community
                                </span>
                            </div>
                        </motion.div>

                        {/* RIGHT — EVENT CARD */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="rounded-[calc(var(--radius)+0.5rem)] bg-gradient-to-br from-[hsl(28_85%_55%)] to-[hsl(24_85%_45%)] p-8 text-white shadow-lg">
                                <div className="flex items-center gap-2 text-sm font-medium opacity-90">
                                    <CalendarDays className="h-4 w-4" />
                                    Next event
                                </div>

                                {next && (
                                    <>
                                        <div className="mt-4 text-xl font-semibold">{next.title}</div>
                                        <div className="mt-1 text-sm opacity-90">
                                            {formatDate(next.date)} · {next.location}
                                        </div>
                                        <p className="mt-4 text-sm opacity-95">{next.description}</p>


                                        <Link
                                            href="/events"
                                            className="mt-6 inline-flex items-center gap-2 text-sm font-medium underline underline-offset-4 transition hover:opacity-90"
                                        >
                                            Event details <Zap className="h-4 w-4" />
                                        </Link>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ================= REST OF PAGE  ================= */}
            <section className="relative w-full overflow-hidden">
                {/* The “designed” canvas */}
                <div className="pointer-events-none absolute inset-0">
                    {/* base creamy paper */}
                    <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,hsl(32_70%_98%)_0%,hsl(28_55%_96%)_35%,hsl(32_70%_97%)_70%,hsl(32_70%_98%)_100%)]" />

                    {/* ultra subtle paper fiber */}
                    <div className="absolute inset-0 opacity-[0.16] [background:radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.05)_1px,transparent_0)] [background-size:56px_56px]" />

                    {/* aurora blobs (animated) */}
                    <motion.div
                        aria-hidden
                        className="absolute -left-52 -top-64 h-[820px] w-[820px] rounded-full blur-3xl"
                        style={{
                            background:
                                "radial-gradient(circle at 30% 30%, rgba(234,88,12,0.18), transparent 55%), radial-gradient(circle at 70% 70%, rgba(59,130,246,0.12), transparent 60%)",
                        }}
                        animate={{ x: [0, 60, -20, 0], y: [0, 30, 10, 0] }}
                        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                        aria-hidden
                        className="absolute -right-64 top-10 h-[920px] w-[920px] rounded-full blur-3xl"
                        style={{
                            background:
                                "radial-gradient(circle at 30% 30%, rgba(59,130,246,0.10), transparent 55%), radial-gradient(circle at 70% 70%, rgba(234,88,12,0.14), transparent 62%)",
                        }}
                        animate={{ x: [0, -50, 20, 0], y: [0, 20, 40, 0] }}
                        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                    />

                    {/* top fade so it blends under hero perfectly */}
                    <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-transparent to-[rgba(255,255,255,0.0)]" />
                </div>

                <div className="relative mx-auto max-w-6xl px-6 py-16 space-y-14">
                    {/* SECTION HEADER */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-120px" }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="space-y-2"
                    >
                        <div className="inline-flex items-center gap-2 rounded-full border bg-white/60 px-4 py-2 text-sm font-medium text-muted-foreground">
                            <Sparkles className="h-4 w-4 text-primary" />
                            What you’ll get
                        </div>
                        <h2 className="text-2xl font-semibold tracking-tight">
                            A community designed for growth
                        </h2>
                        <p className="max-w-2xl text-sm text-muted-foreground">
                            Practical meetups, beginner-friendly support, and a respectful culture — powered by real builders.
                        </p>
                    </motion.div>

                    {/* VALUE PROPS — premium cards */}
                    <motion.section
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-120px" }}
                        transition={{ staggerChildren: 0.08 }}
                        className="grid gap-6 md:grid-cols-3"
                    >
                        {[
                            {
                                title: "Talks & meetups",
                                text: "Practical sessions: Spring, Jakarta EE, performance, architecture, tooling.",
                                icon: Users2,
                                wash: "from-[rgba(234,88,12,0.16)] via-transparent to-transparent",
                            },
                            {
                                title: "Beginner-friendly",
                                text: "New to Java or public speaking? You’re welcome — we’ll help you grow.",
                                icon: Sparkles,
                                wash: "from-[rgba(59,130,246,0.14)] via-transparent to-transparent",
                            },
                            {
                                title: "Community first",
                                text: "Respectful, inclusive, and focused on learning. We take the Code of Conduct seriously.",
                                icon: Handshake,
                                wash: "from-[rgba(234,88,12,0.12)] via-transparent to-transparent",
                            },
                        ].map((b) => {
                            const Icon = b.icon;
                            return (
                                <motion.div key={b.title} variants={fadeUp}>
                                    <Card className="group relative overflow-hidden rounded-[calc(var(--radius)+0.9rem)] bg-white/75 backdrop-blur supports-[backdrop-filter]:bg-white/60 border border-black/10 shadow-[0_18px_60px_-35px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_26px_70px_-40px_rgba(0,0,0,0.45)]">
                                        <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${b.wash}`} />
                                        <div className="pointer-events-none absolute -inset-24 translate-x-[-40%] rotate-12 bg-gradient-to-r from-transparent via-white/35 to-transparent opacity-0 blur-md transition duration-500 group-hover:translate-x-[55%] group-hover:opacity-100" />

                                        <CardHeader className="relative space-y-3">
                                            <div className="flex items-center justify-between">
                                                <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-black/10 bg-white/60">
                                                    <Icon className="h-5 w-5 text-primary" />
                                                </div>
                                            </div>
                                            <CardTitle className="text-base">{b.title}</CardTitle>
                                        </CardHeader>

                                        <CardContent className="relative text-sm leading-relaxed text-muted-foreground">
                                            {b.text}
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            );
                        })}
                    </motion.section>

                    {/* divider that feels designed */}
                    <div className="relative py-2">
                        <div className="h-px w-full bg-gradient-to-r from-transparent via-black/15 to-transparent" />
                    </div>

                    {/* CTA HEADER */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-120px" }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="flex items-end justify-between gap-6 flex-wrap"
                    >
                        <div className="space-y-2">
                            <div className="inline-flex items-center gap-2 rounded-full border bg-white/60 px-4 py-2 text-sm font-medium text-muted-foreground">
                                <Zap className="h-4 w-4 text-primary" />
                                Get involved
                            </div>
                            <h2 className="text-2xl font-semibold tracking-tight">
                                Speak, host, or support — it’s all welcome
                            </h2>
                            <p className="max-w-2xl text-sm text-muted-foreground">
                                Whether you want to share knowledge or help with venues and swag, we make it easy.
                            </p>
                        </div>

                        <Button
                            asChild
                            variant="outline"
                            className="rounded-xl border-primary/60 text-primary hover:bg-primary/10"
                        >
                            <Link href="/join" className="inline-flex items-center gap-2">
                                Join now <ArrowRight className="h-4 w-4" />
                            </Link>
                        </Button>
                    </motion.div>

                    {/* CTA CARDS */}
                    <motion.section
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-120px" }}
                        transition={{ staggerChildren: 0.08 }}
                        className="grid gap-6 md:grid-cols-2"
                    >
                        <motion.div variants={fadeUp}>
                            <Card className="group relative overflow-hidden rounded-[calc(var(--radius)+1rem)] bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border border-black/10 shadow-[0_18px_60px_-35px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_26px_70px_-40px_rgba(0,0,0,0.45)]">
                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[rgba(234,88,12,0.16)] via-transparent to-transparent" />
                                <div className="pointer-events-none absolute -inset-24 translate-x-[-40%] rotate-12 bg-gradient-to-r from-transparent via-white/35 to-transparent opacity-0 blur-md transition duration-500 group-hover:translate-x-[55%] group-hover:opacity-100" />

                                <CardHeader className="relative space-y-2">
                                    <div className="flex items-center gap-3">
                                        <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-black/10 bg-white/60">
                                            <Mic2 className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-base">Want to speak?</CardTitle>
                                            <div className="text-xs text-muted-foreground">
                                                Call for speakers is always open
                                            </div>
                                        </div>
                                    </div>
                                </CardHeader>

                                <CardContent className="relative space-y-4 text-sm text-muted-foreground">
                                    <p className="leading-relaxed">
                                        Propose a talk (30–45 min) or a lightning talk (5–10 min). We’ll help you polish the abstract.
                                    </p>

                                    <div className="flex flex-wrap gap-3">
                                        <Button asChild className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/90">
                                            <Link href="/contact">Propose a talk</Link>
                                        </Button>

                                        <Button
                                            asChild
                                            variant="outline"
                                            className="rounded-xl border-primary/60 text-primary hover:bg-primary/10"
                                        >
                                            <Link href="/events">See upcoming topics</Link>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        <motion.div variants={fadeUp}>
                            <Card className="group relative overflow-hidden rounded-[calc(var(--radius)+1rem)] bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border border-black/10 shadow-[0_18px_60px_-35px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_26px_70px_-40px_rgba(0,0,0,0.45)]">
                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[rgba(59,130,246,0.14)] via-transparent to-transparent" />
                                <div className="pointer-events-none absolute -inset-24 translate-x-[-40%] rotate-12 bg-gradient-to-r from-transparent via-white/35 to-transparent opacity-0 blur-md transition duration-500 group-hover:translate-x-[55%] group-hover:opacity-100" />

                                <CardHeader className="relative space-y-2">
                                    <div className="flex items-center gap-3">
                                        <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-black/10 bg-white/60">
                                            <Handshake className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-base">Sponsors & venues</CardTitle>
                                            <div className="text-xs text-muted-foreground">
                                                Help us keep it free & friendly
                                            </div>
                                        </div>
                                    </div>
                                </CardHeader>

                                <CardContent className="relative space-y-4 text-sm text-muted-foreground">
                                    <p className="leading-relaxed">
                                        Support with a venue, snacks, swag, or scholarships. No sales pitches — community value first.
                                    </p>

                                    <div className="flex flex-wrap gap-3">
                                        <Button
                                            asChild
                                            variant="outline"
                                            className="rounded-xl border-primary/60 text-primary hover:bg-primary/10"
                                        >
                                            <Link href="/contact">Sponsor / host</Link>
                                        </Button>

                                        <Button asChild className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/90">
                                            <Link href="/join">Become a partner</Link>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </motion.section>

                    {/* */}
                    <Separator className="opacity-0 h-0" />
                </div>
            </section>
        </div>
    );
}
