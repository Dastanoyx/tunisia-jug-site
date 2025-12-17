"use client";


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, type Variants } from "framer-motion";
import {
    Sparkles,
    Users2,
    Calendar,
    MessageCircle,
    Video,
    Globe,
    Lock,
} from "lucide-react";

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 14 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, ease: "easeOut" },
    },
};

const platforms = [
    {
        key: "meetup",
        label: "Meetup",
        desc: "Official events & RSVPs",
        icon: Calendar,
        color: "from-[rgba(234,88,12,0.18)]",
    },
    {
        key: "linkedin",
        label: "LinkedIn",
        desc: "Professional updates & announcements",
        icon: Globe,
        color: "from-[rgba(59,130,246,0.16)]",
    },
    {
        key: "facebook",
        label: "Facebook",
        desc: "Community posts & discussions",
        icon: Users2,
        color: "from-[rgba(37,99,235,0.14)]",
    },
    {
        key: "telegram",
        label: "Telegram",
        desc: "Quick updates & reminders",
        icon: MessageCircle,
        color: "from-[rgba(59,130,246,0.18)]",
    },
    {
        key: "discord",
        label: "Discord",
        desc: "Chat, help & tech discussions",
        icon: MessageCircle,
        color: "from-[rgba(99,102,241,0.18)]",
    },
    {
        key: "youtube",
        label: "YouTube",
        desc: "Talk recordings & sessions",
        icon: Video,
        color: "from-[rgba(234,88,12,0.16)]",
    },
] as const;

export default function JoinPage() {
    return (
        <div className="relative">
            {/* ===== BACKDROP ===== */}
            <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                {/* creamy paper base */}
                <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,hsl(32_70%_98%)_0%,hsl(28_55%_96%)_35%,hsl(32_70%_97%)_70%,hsl(32_70%_98%)_100%)]" />
                {/* paper grain */}
                <div className="absolute inset-0 opacity-[0.14] [background:radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.05)_1px,transparent_0)] [background-size:56px_56px]" />
                {/* warm glows */}
                <div className="absolute -left-64 -top-72 h-[860px] w-[860px] rounded-full bg-[rgba(234,88,12,0.14)] blur-3xl" />
                <div className="absolute -right-64 top-20 h-[920px] w-[920px] rounded-full bg-[rgba(59,130,246,0.10)] blur-3xl" />
            </div>

            <div className="mx-auto max-w-6xl px-6 py-14 space-y-12">
                {/* ===== HEADER ===== */}
                <motion.div
                    initial="hidden"
                    animate="show"
                    variants={fadeUp}
                    className="space-y-4"
                >
                    <div className="inline-flex items-center gap-2 rounded-full border bg-white/70 px-4 py-2 text-sm font-medium text-muted-foreground">
                        <Sparkles className="h-4 w-4 text-primary" />
                        Join the community
                    </div>

                    <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
                        Be part of Tunisia’s Java ecosystem
                    </h1>

                    <p className="max-w-2xl text-muted-foreground leading-relaxed">
                        Join us on your favorite platforms to get event announcements,
                        speaker calls, recordings, and community discussions.
                        We’re just getting started — and you’re early 🚀
                    </p>
                </motion.div>

                {/* ===== PLATFORMS ===== */}
                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-120px" }}
                    transition={{ staggerChildren: 0.08 }}
                    className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                >
                    {platforms.map((p) => {
                        const Icon = p.icon;
                        return (
                            <motion.div key={p.key} variants={fadeUp}>
                                <Card className="group relative overflow-hidden rounded-[calc(var(--radius)+0.8rem)] border border-black/10 bg-white/70 shadow-[0_24px_80px_-55px_rgba(0,0,0,0.45)] transition hover:-translate-y-1">
                                    {/* soft color wash */}
                                    <div
                                        className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${p.color} to-transparent`}
                                    />

                                    {/* shine sweep */}
                                    <div className="pointer-events-none absolute -inset-24 translate-x-[-55%] rotate-12 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 blur-md transition duration-700 group-hover:translate-x-[55%] group-hover:opacity-100" />

                                    <CardHeader className="relative space-y-3">
                                        <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-black/10 bg-white/70">
                                            <Icon className="h-5 w-5 text-primary" />
                                        </div>
                                        <CardTitle className="text-base">{p.label}</CardTitle>
                                    </CardHeader>

                                    <CardContent className="relative space-y-3 text-sm text-muted-foreground">
                                        <p>{p.desc}</p>

                                        {/* coming soon state */}
                                        <div className="inline-flex items-center gap-2 rounded-full border bg-white/60 px-3 py-1 text-xs">
                                            <Lock className="h-3.5 w-3.5" />
                                            Coming soon
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* ===== MICRO CTA ===== */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-120px" }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="rounded-[calc(var(--radius)+1rem)] border border-black/10 bg-white/70 p-6 shadow-[0_20px_70px_-50px_rgba(0,0,0,0.45)]"
                >
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-1">
                            <div className="text-sm font-semibold">
                                Want to help launch these channels?
                            </div>
                            <div className="text-sm text-muted-foreground">
                                We’re opening them gradually — volunteers and moderators are welcome.
                            </div>
                        </div>

                        <div className="inline-flex items-center rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
                            🚀 Community launching soon
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
