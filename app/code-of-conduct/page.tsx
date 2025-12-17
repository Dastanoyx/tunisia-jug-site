"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
    AlertTriangle,
    ArrowUpRight,
    CheckCircle2,
    Flag,
    HandHeart,
    MessageSquareWarning,
    Scale,
    Shield,
    Sparkles,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export default function CodeOfConductPage() {
    return (
        <div className="relative">
            {/* ===== BACKDROP  ===== */}
            <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,hsl(32_70%_98%)_0%,hsl(28_55%_96%)_35%,hsl(32_70%_97%)_70%,hsl(32_70%_98%)_100%)]" />
                <div className="absolute inset-0 opacity-[0.14] [background:radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.05)_1px,transparent_0)] [background-size:56px_56px]" />
                <div className="absolute -left-48 -top-56 h-[560px] w-[560px] rounded-full bg-[rgba(234,88,12,0.10)] blur-3xl" />
                <div className="absolute -right-56 top-10 h-[680px] w-[680px] rounded-full bg-[rgba(59,130,246,0.10)] blur-3xl" />
            </div>

            <div className="mx-auto max-w-6xl px-6 py-14 space-y-10">
                {/* ===== HEADER ===== */}
                <motion.div initial="hidden" animate="show" variants={fadeUp} className="space-y-4">
                    <div className="inline-flex items-center gap-2 rounded-full border bg-white/70 px-4 py-2 text-sm font-medium text-muted-foreground">
                        <Sparkles className="h-4 w-4 text-primary" />
                        Community standards
                    </div>

                    <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Code of Conduct</h1>

                    <p className="max-w-3xl text-muted-foreground leading-relaxed">
                        Tunisia JUG is dedicated to providing a harassment-free, inclusive experience for everyone. We welcome
                        people of all backgrounds and experience levels — and we expect everyone to help keep this community safe,
                        respectful, and constructive.
                    </p>

                    <div className="flex flex-wrap gap-3 pt-2">
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                        >
                            Report an issue <ArrowUpRight className="ml-2 h-4 w-4" />
                        </Link>

                        <a
                            href="#reporting"
                            className="inline-flex items-center justify-center rounded-xl border border-primary/60 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10"
                        >
                            How reporting works
                        </a>
                    </div>
                </motion.div>

                {/* ===== PRINCIPLES ===== */}
                <motion.section
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-120px" }}
                    transition={{ staggerChildren: 0.08 }}
                    className="grid gap-5 md:grid-cols-3"
                >
                    {[
                        {
                            title: "Be respectful",
                            text: "Be kind, constructive, and mindful of others’ time and boundaries.",
                            icon: HandHeart,
                            wash: "from-[rgba(234,88,12,0.12)] to-transparent",
                        },
                        {
                            title: "Be safe",
                            text: "No harassment, hate speech, discrimination, or unwanted attention.",
                            icon: Shield,
                            wash: "from-[rgba(59,130,246,0.10)] to-transparent",
                        },
                        {
                            title: "Be accountable",
                            text: "If you make a mistake, listen, apologize, and adjust. We all learn.",
                            icon: Scale,
                            wash: "from-[rgba(234,88,12,0.10)] to-transparent",
                        },
                    ].map((b) => {
                        const Icon = b.icon;
                        return (
                            <motion.div key={b.title} variants={fadeUp}>
                                <Card className="relative overflow-hidden rounded-[calc(var(--radius)+0.75rem)] border border-black/10 bg-white/70 shadow-[0_22px_70px_-55px_rgba(0,0,0,0.45)]">
                                    <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${b.wash}`} />
                                    <CardHeader className="relative pb-2">
                                        <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-black/10 bg-white/60">
                                            <Icon className="h-5 w-5 text-primary" />
                                        </div>
                                        <CardTitle className="pt-2 text-base">{b.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="relative text-sm text-muted-foreground leading-relaxed">
                                        {b.text}
                                    </CardContent>
                                </Card>
                            </motion.div>
                        );
                    })}
                </motion.section>

                {/* ===== DETAILS ===== */}
                <motion.section
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-120px" }}
                    transition={{ duration: 0.55, ease: "easeOut" }}
                    className="space-y-6"
                >
                    <Card className="relative overflow-hidden rounded-[calc(var(--radius)+1rem)] border border-black/10 bg-white/70">
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[rgba(59,130,246,0.10)] via-transparent to-[rgba(234,88,12,0.08)]" />
                        <CardContent className="relative p-6 md:p-8 space-y-6">
                            <div className="space-y-2">
                                <div className="inline-flex items-center gap-2 rounded-full border bg-white/70 px-4 py-2 text-sm font-medium text-muted-foreground">
                                    <CheckCircle2 className="h-4 w-4 text-primary" />
                                    Expected behavior
                                </div>
                                <h2 className="text-xl font-semibold tracking-tight">What we encourage</h2>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Tunisia JUG works best when we help each other learn, speak up kindly, and give feedback with care.
                                </p>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                {[
                                    "Be kind and constructive — critique ideas, not people.",
                                    "Welcome beginners and support first-time speakers.",
                                    "Ask before giving unsolicited help or feedback.",
                                    "Respect personal boundaries and consent.",
                                    "Keep discussions professional and inclusive.",
                                    "Help organizers keep the space safe and friendly.",
                                ].map((t) => (
                                    <div
                                        key={t}
                                        className="flex gap-3 rounded-[calc(var(--radius)+0.6rem)] border border-black/10 bg-white/65 p-4"
                                    >
                                        <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary" />
                                        <div className="text-sm text-muted-foreground leading-relaxed">{t}</div>
                                    </div>
                                ))}
                            </div>

                            <Separator className="bg-black/10" />

                            <div className="space-y-2">
                                <div className="inline-flex items-center gap-2 rounded-full border bg-white/70 px-4 py-2 text-sm font-medium text-muted-foreground">
                                    <AlertTriangle className="h-4 w-4 text-primary" />
                                    Unacceptable behavior
                                </div>
                                <h2 className="text-xl font-semibold tracking-tight">What’s not okay</h2>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                {[
                                    "Harassment, intimidation, stalking, or bullying.",
                                    "Hate speech, discrimination, or demeaning comments.",
                                    "Unwanted sexual attention or persistent flirting.",
                                    "Deliberate disruption of talks or activities.",
                                    "Sharing someone’s private info without consent.",
                                    "Retaliation against anyone who reports a concern.",
                                ].map((t) => (
                                    <div
                                        key={t}
                                        className="flex gap-3 rounded-[calc(var(--radius)+0.6rem)] border border-black/10 bg-white/65 p-4"
                                    >
                                        <MessageSquareWarning className="mt-0.5 h-5 w-5 text-primary" />
                                        <div className="text-sm text-muted-foreground leading-relaxed">{t}</div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </motion.section>

                {/* ===== REPORTING ===== */}
                <motion.section
                    id="reporting"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-120px" }}
                    transition={{ duration: 0.55, ease: "easeOut" }}
                    className="space-y-6"
                >
                    <Card className="relative overflow-hidden rounded-[calc(var(--radius)+1rem)] border border-black/10 bg-white/70 shadow-[0_22px_70px_-55px_rgba(0,0,0,0.45)]">
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[rgba(234,88,12,0.10)] via-transparent to-[rgba(59,130,246,0.08)]" />
                        <CardContent className="relative p-6 md:p-8 space-y-6">
                            <div className="space-y-2">
                                <div className="inline-flex items-center gap-2 rounded-full border bg-white/70 px-4 py-2 text-sm font-medium text-muted-foreground">
                                    <Flag className="h-4 w-4 text-primary" />
                                    Reporting
                                </div>
                                <h2 className="text-xl font-semibold tracking-tight">If something feels off, tell us</h2>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    If you experience or witness unacceptable behavior, contact the organizers. We will respond promptly
                                    and take appropriate action.
                                </p>
                            </div>

                            <div className="grid gap-4 md:grid-cols-3">
                                {[
                                    {
                                        title: "1) Reach out",
                                        text: "Use the contact form. If you’re at an event, find an organizer immediately.",
                                    },
                                    {
                                        title: "2) We listen",
                                        text: "We’ll take your report seriously and ask only what’s needed to understand.",
                                    },
                                    {
                                        title: "3) We act",
                                        text: "Actions may include a warning, removal, or banning — depending on severity.",
                                    },
                                ].map((s) => (
                                    <div
                                        key={s.title}
                                        className="rounded-[calc(var(--radius)+0.6rem)] border border-black/10 bg-white/65 p-5"
                                    >
                                        <div className="text-sm font-semibold">{s.title}</div>
                                        <p className="pt-1 text-sm text-muted-foreground leading-relaxed">{s.text}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-wrap gap-3">
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                                >
                                    Report via contact form <ArrowUpRight className="ml-2 h-4 w-4" />
                                </Link>

                                <a
                                    href="/join"
                                    className="inline-flex items-center justify-center rounded-xl border border-primary/60 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10"
                                >
                                    Join the community
                                </a>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="text-xs text-muted-foreground">
                        Scope: This code applies to all Tunisia JUG events and online spaces, including talks, chats, and community
                        channels.
                    </div>
                </motion.section>
            </div>
        </div>
    );
}
