"use client";

import Link from "next/link";
import { site } from "@/content/site";
import { team } from "@/content/team";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, type Variants } from "framer-motion";
import {
    ArrowUpRight,
    Crown,
    Handshake,
    Sparkles,
    Users2,
    Mail,
    ShieldCheck,
} from "lucide-react";

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 14 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, ease: "easeOut" },
    },
};

function initials(name: string) {
    const parts = name.trim().split(/\s+/).slice(0, 2);
    return parts.map((p) => p[0]?.toUpperCase()).join("");
}

export default function AboutPage() {
    return (
        <div className="relative">
            {/* ======== BACKDROP (same design language as your home) ======== */}
            <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                {/* creamy paper base */}
                <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,hsl(32_70%_98%)_0%,hsl(28_55%_96%)_35%,hsl(32_70%_97%)_70%,hsl(32_70%_98%)_100%)]" />
                {/* subtle paper fiber */}
                <div className="absolute inset-0 opacity-[0.14] [background:radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.05)_1px,transparent_0)] [background-size:56px_56px]" />

                {/* aurora blobs (subtle motion) */}
                <motion.div
                    aria-hidden
                    className="absolute -left-56 -top-72 h-[860px] w-[860px] rounded-full blur-3xl"
                    style={{
                        background:
                            "radial-gradient(circle at 30% 30%, rgba(234,88,12,0.16), transparent 56%), radial-gradient(circle at 70% 70%, rgba(59,130,246,0.10), transparent 60%)",
                    }}
                    animate={{ x: [0, 60, -20, 0], y: [0, 24, 10, 0] }}
                    transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    aria-hidden
                    className="absolute -right-64 top-10 h-[920px] w-[920px] rounded-full blur-3xl"
                    style={{
                        background:
                            "radial-gradient(circle at 30% 30%, rgba(59,130,246,0.10), transparent 56%), radial-gradient(circle at 70% 70%, rgba(234,88,12,0.12), transparent 62%)",
                    }}
                    animate={{ x: [0, -50, 20, 0], y: [0, 18, 38, 0] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>

            <div className="mx-auto max-w-6xl px-6 py-14 space-y-12">
                {/* ======== HEADER ======== */}
                <motion.div initial="hidden" animate="show" variants={fadeUp} className="space-y-4">
                    <div className="inline-flex items-center gap-2 rounded-full border bg-white/70 px-4 py-2 text-sm font-medium text-muted-foreground">
                        <Sparkles className="h-4 w-4 text-primary" />
                        About the community
                    </div>

                    <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
                        Built by builders, for builders
                    </h1>

                    <p className="max-w-3xl text-base leading-relaxed text-muted-foreground">
                        {site.description}
                    </p>

                    {/* quick stats / principles */}
                    <div className="grid gap-4 pt-3 md:grid-cols-3">
                        {[
                            {
                                title: "Community-led",
                                text: "Run by volunteers, driven by learning — not sales.",
                                icon: Handshake,
                                wash: "from-[rgba(234,88,12,0.12)] to-transparent",
                            },
                            {
                                title: "Inclusive by design",
                                text: "Beginner-friendly, respectful, and supportive.",
                                icon: Users2,
                                wash: "from-[rgba(59,130,246,0.10)] to-transparent",
                            },
                            {
                                title: "Quality & care",
                                text: "We curate talks and keep the space respectful and high-signal.",
                                icon: ShieldCheck,
                                wash: "from-[rgba(234,88,12,0.10)] to-transparent",
                            },
                        ].map((b) => {
                            const Icon = b.icon;
                            return (
                                <div
                                    key={b.title}
                                    className="relative overflow-hidden rounded-[calc(var(--radius)+0.6rem)] border border-black/10 bg-white/70 p-5 shadow-[0_18px_60px_-40px_rgba(0,0,0,0.35)]"
                                >
                                    <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${b.wash}`} />
                                    <div className="relative space-y-2">
                                        <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-black/10 bg-white/60">
                                            <Icon className="h-5 w-5 text-primary" />
                                        </div>
                                        <div className="text-sm font-semibold">{b.title}</div>
                                        <p className="text-sm text-muted-foreground leading-relaxed">{b.text}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </motion.div>

                {/* ======== TEAM ======== */}
                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-120px" }}
                    transition={{ staggerChildren: 0.08 }}
                    className="space-y-4"
                >
                    <div className="flex items-end justify-between gap-6 flex-wrap">
                        <div className="space-y-2">
                            <div className="inline-flex items-center gap-2 rounded-full border bg-white/70 px-4 py-2 text-sm font-medium text-muted-foreground">
                                <Users2 className="h-4 w-4 text-primary" />
                                Organizing team
                            </div>
                            <h2 className="text-2xl font-semibold tracking-tight">The people behind the meetups</h2>
                            <p className="text-sm text-muted-foreground max-w-2xl">
                                We keep things friendly, practical, and consistent — from speakers to venues to community care.
                            </p>
                        </div>

                        <div className="text-sm text-muted-foreground">
                            Want to help?{" "}
                            <Link className="text-primary underline underline-offset-4 hover:opacity-90" href="/join">
                                Join the team
                            </Link>
                        </div>
                    </div>

                    <Card className="relative overflow-hidden rounded-[calc(var(--radius)+1rem)] border border-black/10 bg-white/70 shadow-[0_24px_80px_-55px_rgba(0,0,0,0.45)]">
                        {/* soft wash */}
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[rgba(234,88,12,0.10)] via-transparent to-[rgba(59,130,246,0.08)]" />

                        <CardHeader className="relative flex flex-row items-center justify-between gap-4">
                            <div>
                                <CardTitle className="text-base">Meet the organizers</CardTitle>
                                <div className="mt-1 text-xs text-muted-foreground">
                                    Community-run. Always open to new organizers.
                                </div>
                            </div>

                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 rounded-full border bg-white/60 px-4 py-2 text-sm text-muted-foreground transition hover:bg-white/80 hover:text-foreground"
                            >
                                Contact us <ArrowUpRight className="h-4 w-4" />
                            </Link>
                        </CardHeader>

                        <CardContent className="relative grid gap-4 md:grid-cols-2">
                            {team.map((m) => {
                                const isFounder =
                                    !!m.founder || m.role.trim().toLowerCase() === "founder";

                                const profile =
                                    m.links?.find((l) => l.label.toLowerCase() === "profile") ??
                                    m.links?.[0] ??
                                    null;

                                const profileIsLive = !!profile?.url && profile.url !== "#";

                                return (
                                    <motion.div key={m.name} variants={fadeUp}>
                                        <div
                                            className={[
                                                "group relative overflow-hidden rounded-[calc(var(--radius)+0.75rem)] border p-5 transition-all duration-300 hover:-translate-y-1",
                                                isFounder
                                                    ? "border-primary/40 bg-white shadow-[0_28px_85px_-48px_rgba(234,88,12,0.40)]"
                                                    : "border-black/10 bg-white/75 shadow-sm hover:shadow-[0_22px_70px_-48px_rgba(0,0,0,0.45)]",
                                            ].join(" ")}
                                        >
                                            {/* gradient corner wash */}
                                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[rgba(234,88,12,0.10)] via-transparent to-transparent opacity-80" />
                                            {/* hover shine */}
                                            <div className="pointer-events-none absolute -inset-24 translate-x-[-55%] rotate-12 bg-gradient-to-r from-transparent via-white/35 to-transparent opacity-0 blur-md transition duration-500 group-hover:translate-x-[55%] group-hover:opacity-100" />

                                            <div className="relative space-y-3">
                                                <div className="flex items-start justify-between gap-4">
                                                    <div className="flex items-start gap-4">
                                                        {/* avatar initials */}
                                                        <div className="relative">
                                                            <div className="h-12 w-12 rounded-2xl bg-white/60 border border-black/10 grid place-items-center text-sm font-semibold text-foreground">
                                                                {initials(m.name)}
                                                            </div>

                                                            {isFounder && (
                                                                <div className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-primary text-primary-foreground shadow-sm">
                                                                    <Crown className="h-3.5 w-3.5" />
                                                                </div>
                                                            )}
                                                        </div>

                                                        <div className="space-y-1">
                                                            <div className="flex flex-wrap items-center gap-2">
                                                                <div className="text-sm font-semibold">{m.name}</div>

                                                                {isFounder && (
                                                                    <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary border border-primary/20">
                                    <Crown className="h-3 w-3" /> Founder
                                  </span>
                                                                )}
                                                            </div>

                                                            <div className="flex flex-wrap items-center gap-2">
                                                                <div className="text-xs text-muted-foreground">{m.role}</div>
                                                                <span className="text-xs text-muted-foreground">•</span>
                                                                <div className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                                                                    <Mail className="h-3.5 w-3.5" />
                                                                    Community contact via form
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* profile chip (clickable only if URL is real) */}
                                                    {profile ? (
                                                        profileIsLive ? (
                                                            <a
                                                                href={profile.url}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                                className="inline-flex items-center gap-1 rounded-full border bg-white/60 px-3 py-1 text-xs text-muted-foreground transition hover:bg-white/80 hover:text-foreground"
                                                            >
                                                                {profile.label} <ArrowUpRight className="h-3.5 w-3.5" />
                                                            </a>
                                                        ) : (
                                                            <span className="inline-flex items-center gap-1 rounded-full border bg-white/50 px-3 py-1 text-xs text-muted-foreground/70">
                                {profile.label} <ArrowUpRight className="h-3.5 w-3.5" />
                              </span>
                                                        )
                                                    ) : null}
                                                </div>

                                                <p className="text-sm text-muted-foreground leading-relaxed">{m.bio}</p>

                                                {/* micro footer row */}
                                                <div className="flex flex-wrap items-center gap-2 pt-1">
                          <span className="inline-flex items-center rounded-full border bg-white/60 px-3 py-1 text-xs text-muted-foreground">
                            Talks
                          </span>
                                                    <span className="inline-flex items-center rounded-full border bg-white/60 px-3 py-1 text-xs text-muted-foreground">
                            Meetups
                          </span>
                                                    <span className="inline-flex items-center rounded-full border bg-white/60 px-3 py-1 text-xs text-muted-foreground">
                            Community care
                          </span>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </CardContent>
                    </Card>
                </motion.div>

                {/* ======== MICRO CTA ======== */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-120px" }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="rounded-[calc(var(--radius)+1rem)] border border-black/10 bg-white/70 p-6 shadow-[0_20px_70px_-50px_rgba(0,0,0,0.45)]"
                >
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-1">
                            <div className="text-sm font-semibold">Help us grow Tunisia’s Java ecosystem</div>
                            <div className="text-sm text-muted-foreground">
                                Speak, volunteer, host a meetup, or suggest a topic — we’ll make it easy.
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                            >
                                Propose a talk
                            </Link>

                            <Link
                                href="/join"
                                className="inline-flex items-center justify-center rounded-xl border border-primary/60 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10"
                            >
                                Join the community
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
