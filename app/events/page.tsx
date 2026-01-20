"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { site } from "@/content/site";
import { events, type Event } from "./events";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { motion, type Variants } from "framer-motion";
import {
    ArrowLeft,
    ArrowRight,
    ArrowUpRight,
    CalendarPlus,
    Clock,
    MapPin,
    Sparkles,
    Coffee,
    Linkedin,
    X,
    Images,
    Maximize2,
} from "lucide-react";

function formatDate(isoDateOnly: string) {
    const d = new Date(`${isoDateOnly}T00:00:00`);
    return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

function formatTimeLocal(dateObj: Date) {
    return dateObj.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
}

function hasTime(e: Pick<Event, "time">) {
    return Boolean(e.time && e.time.trim().length > 0);
}

function eventStartDateIfTime(e: Pick<Event, "date" | "time">): Date | null {
    if (!hasTime(e)) return null;
    const t = e.time!.trim();
    const d = new Date(`${e.date}T${t}:00`);
    return Number.isNaN(d.getTime()) ? null : d;
}

function toICSDateUTC(date: Date) {
    const pad = (n: number) => String(n).padStart(2, "0");
    return (
        date.getUTCFullYear() +
        pad(date.getUTCMonth() + 1) +
        pad(date.getUTCDate()) +
        "T" +
        pad(date.getUTCHours()) +
        pad(date.getUTCMinutes()) +
        pad(date.getUTCSeconds()) +
        "Z"
    );
}

function downloadICS(params: {
    title: string;
    description?: string;
    location?: string;
    date: string;
    time?: string;
    durationMinutes?: number;
}) {
    const { title, description, location, date, time, durationMinutes = 90 } = params;

    const startLocal = eventStartDateIfTime({ date, time });
    if (!startLocal) return;

    const endLocal = new Date(startLocal.getTime() + durationMinutes * 60 * 1000);
    const uid = globalThis.crypto?.randomUUID?.() ?? `${Date.now()}@tunisiajug`;

    const ics = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//Tunisia JUG//Events//EN",
        "CALSCALE:GREGORIAN",
        "METHOD:PUBLISH",
        "BEGIN:VEVENT",
        `UID:${uid}`,
        `DTSTAMP:${toICSDateUTC(new Date())}`,
        `DTSTART:${toICSDateUTC(startLocal)}`,
        `DTEND:${toICSDateUTC(endLocal)}`,
        `SUMMARY:${title.replace(/\n/g, " ")}`,
        `DESCRIPTION:${(description ?? "").replace(/\n/g, " ")}`,
        `LOCATION:${(location ?? "").replace(/\n/g, " ")}`,
        "END:VEVENT",
        "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${title.replace(/[^\w\-]+/g, "-").toLowerCase()}-tunisia-jug.ics`;
    document.body.appendChild(a);
    a.click();
    a.remove();

    URL.revokeObjectURL(url);
}

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

function cx(...classes: Array<string | false | undefined | null>) {
    return classes.filter(Boolean).join(" ");
}

function buildPhotoSrcs(folder: string, count: number) {
    return Array.from({ length: count }).map((_, i) => `/event-photos/${folder}/${i + 1}.jpg`);
}

function clamp(n: number, min: number, max: number) {
    return Math.max(min, Math.min(max, n));
}

export default function EventsPage() {
    const upcoming = events.filter((e) => e.status === "upcoming");
    const past = events.filter((e) => e.status === "past");

    const next =
        upcoming
            .slice()
            .sort((a, b) => {
                const at = eventStartDateIfTime(a)?.getTime() ?? new Date(`${a.date}T23:59:59`).getTime();
                const bt = eventStartDateIfTime(b)?.getTime() ?? new Date(`${b.date}T23:59:59`).getTime();
                return at - bt;
            })[0] ?? null;

    // ================= LIGHTBOX =================
    const [lightbox, setLightbox] = useState<{
        open: boolean;
        title?: string;
        photos: string[];
        index: number;
    }>({ open: false, photos: [], index: 0 });

    const isOpen = lightbox.open;
    const currentSrc = lightbox.photos[lightbox.index];

    const openLightbox = useCallback((title: string, photos: string[], index: number) => {
        setLightbox({ open: true, title, photos, index });
        document.documentElement.classList.add("overflow-hidden");
    }, []);

    const closeLightbox = useCallback(() => {
        setLightbox((s) => ({ ...s, open: false }));
        document.documentElement.classList.remove("overflow-hidden");
    }, []);

    const prevPhoto = useCallback(() => {
        setLightbox((s) => ({
            ...s,
            index: (s.index - 1 + s.photos.length) % s.photos.length,
        }));
    }, []);

    const nextPhoto = useCallback(() => {
        setLightbox((s) => ({
            ...s,
            index: (s.index + 1) % s.photos.length,
        }));
    }, []);

    useEffect(() => {
        if (!isOpen) return;

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeLightbox();
            if (e.key === "ArrowLeft") prevPhoto();
            if (e.key === "ArrowRight") nextPhoto();
        };

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [isOpen, closeLightbox, prevPhoto, nextPhoto]);

    const lightboxVariants: Variants = useMemo(
        () => ({
            hidden: { opacity: 0, scale: 0.98, y: 10 },
            show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.25, ease: "easeOut" } },
        }),
        []
    );

    // ================= "ALL TOGETHER" PHOTO WALL =================
    // A single unified container (one border + one radius) that contains all thumbnails.
    // Inside: no gaps, only hairline separators so it feels like ONE piece.
    const buildWall = useCallback((photos: string[]) => {
        // Show up to 12 thumbs in the wall (works for any number; if more, last tile shows +X)
        const max = 12;
        const visible = photos.slice(0, max);
        const remaining = photos.length - visible.length;

        // Responsive columns:
        // - mobile: 3
        // - sm: 4
        // - md: 6
        // - lg: 8
        // Use square-ish tiles for clean density.
        return { visible, remaining };
    }, []);

    return (
        <div className="relative">
            {/* ===== BACKDROP ===== */}
            <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,hsl(32_70%_98%)_0%,hsl(28_55%_96%)_35%,hsl(32_70%_97%)_70%,hsl(32_70%_98%)_100%)]" />
                <div className="absolute inset-0 opacity-[0.14] [background:radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.05)_1px,transparent_0)] [background-size:56px_56px]" />
                <div className="absolute -left-48 -top-56 h-[560px] w-[560px] rounded-full bg-[rgba(234,88,12,0.10)] blur-3xl" />
                <div className="absolute -right-56 top-10 h-[680px] w-[680px] rounded-full bg-[rgba(59,130,246,0.10)] blur-3xl" />
            </div>

            <div className="mx-auto max-w-6xl px-6 py-14 space-y-12">
                {/* ===== HEADER ===== */}
                <motion.div initial="hidden" animate="show" variants={fadeUp} className="space-y-4">
                    <div className="inline-flex items-center gap-2 rounded-full border bg-white/70 px-4 py-2 text-sm font-medium text-muted-foreground">
                        <Sparkles className="h-4 w-4 text-primary" />
                        Events
                    </div>

                    <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                        <div className="space-y-2">
                            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Coffee & Talks</h1>
                            <p className="text-muted-foreground max-w-2xl">
                                Warm coffee, sharp ideas, and friendly people. Join the next meetup—or help us shape the next topic.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <Button asChild className="rounded-xl">
                                <Link href="/join">Join the community</Link>
                            </Button>
                            <Button asChild variant="outline" className="rounded-xl border-primary/60 text-primary hover:bg-primary/10">
                                <Link href="/contact">
                                    Propose a talk <ArrowUpRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </motion.div>

                {/* ===== NEXT EVENT HERO CARD ===== */}
                <motion.section
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-120px" }}
                    transition={{ duration: 0.55, ease: "easeOut" }}
                >
                    <Card className="relative overflow-hidden rounded-[calc(var(--radius)+1rem)] border border-black/10 bg-white/70 shadow-[0_30px_90px_-60px_rgba(0,0,0,0.55)]">
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[rgba(234,88,12,0.10)] via-transparent to-[rgba(59,130,246,0.08)]" />

                        <CardContent className="relative p-6 md:p-8">
                            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <Badge variant="secondary" className="bg-white/70">
                                            Upcoming
                                        </Badge>
                                        <Badge variant="secondary" className="bg-white/70">
                                            {upcoming.length} scheduled
                                        </Badge>
                                    </div>

                                    {next ? (
                                        <>
                                            <div className="text-xl font-semibold tracking-tight md:text-2xl">{next.title}</div>

                                            <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
                        <span className="inline-flex items-center gap-2">
                          <CalendarPlus className="h-4 w-4 text-primary" />
                            {formatDate(next.date)}
                        </span>

                                                {hasTime(next) && eventStartDateIfTime(next) ? (
                                                    <span className="inline-flex items-center gap-2">
                            <Clock className="h-4 w-4 text-primary" />
                                                        {formatTimeLocal(eventStartDateIfTime(next)!)}
                          </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-2">
                            <Clock className="h-4 w-4 text-primary" />
                            <span className="rounded-full border bg-white/60 px-2.5 py-0.5 text-xs text-muted-foreground">
                              Time will be announced soon
                            </span>
                          </span>
                                                )}

                                                <span className="inline-flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-primary" />
                                                    {next.location}
                        </span>
                                            </div>

                                            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">{next.description}</p>

                                            <div className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                                                <Coffee className="h-4 w-4 text-primary" />
                                                Meet, connect, and build the community together — one coffee at a time.
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="text-xl font-semibold tracking-tight md:text-2xl">No upcoming events yet</div>
                                            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                                                We’re planning the next Coffee & Talks. If you can host a venue or give a talk, we’d love to hear from you.
                                            </p>
                                        </>
                                    )}
                                </div>

                                <div className="flex flex-wrap gap-3 md:justify-end">
                                    {next ? (
                                        <>
                                            <Button
                                                className="rounded-xl"
                                                disabled={!hasTime(next) || !eventStartDateIfTime(next)}
                                                title={!hasTime(next) ? "Time not announced yet" : undefined}
                                                onClick={() =>
                                                    downloadICS({
                                                        title: next.title,
                                                        description: next.description,
                                                        location: next.location,
                                                        date: next.date,
                                                        time: next.time,
                                                        durationMinutes: next.durationMinutes ?? 90,
                                                    })
                                                }
                                            >
                                                <CalendarPlus className="mr-2 h-4 w-4" />
                                                Add to calendar
                                            </Button>

                                            <Button asChild variant="outline" className="rounded-xl border-primary/60 text-primary hover:bg-primary/10">
                                                <Link href="/contact">Become a speaker</Link>
                                            </Button>

                                            {next.links?.length ? (
                                                <Button asChild variant="outline" className="rounded-xl border-primary/60 text-primary hover:bg-primary/10">
                                                    <a href={next.links[0].url} target="_blank" rel="noreferrer">
                                                        {next.links[0].label} <ArrowUpRight className="ml-2 h-4 w-4" />
                                                    </a>
                                                </Button>
                                            ) : null}
                                        </>
                                    ) : (
                                        <>
                                            <Button asChild className="rounded-xl">
                                                <Link href="/contact">Host / sponsor</Link>
                                            </Button>
                                            <Button asChild variant="outline" className="rounded-xl border-primary/60 text-primary hover:bg-primary/10">
                                                <Link href="/contact">Propose a talk</Link>
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.section>

                {/* ===== UPCOMING LIST ===== */}
                <motion.section
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-120px" }}
                    transition={{ staggerChildren: 0.08 }}
                    className="space-y-4"
                >
                    <div className="flex items-center gap-2">
                        <h2 className="text-lg font-semibold">Upcoming</h2>
                        <Badge variant="secondary" className="bg-white/70">
                            {upcoming.length}
                        </Badge>
                    </div>

                    <div className="grid gap-4">
                        {upcoming.length ? (
                            upcoming
                                .slice()
                                .sort((a, b) => {
                                    const at = eventStartDateIfTime(a)?.getTime() ?? new Date(`${a.date}T23:59:59`).getTime();
                                    const bt = eventStartDateIfTime(b)?.getTime() ?? new Date(`${b.date}T23:59:59`).getTime();
                                    return at - bt;
                                })
                                .map((e) => {
                                    const start = eventStartDateIfTime(e);
                                    return (
                                        <motion.div key={e.title} variants={fadeUp}>
                                            <Card className="group relative overflow-hidden rounded-[calc(var(--radius)+0.75rem)] border border-black/10 bg-white/70 shadow-[0_22px_70px_-55px_rgba(0,0,0,0.45)] transition-all duration-300 hover:-translate-y-1">
                                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[rgba(234,88,12,0.08)] via-transparent to-transparent opacity-80" />
                                                <div className="pointer-events-none absolute -inset-24 translate-x-[-55%] rotate-12 bg-gradient-to-r from-transparent via-white/35 to-transparent opacity-0 blur-md transition duration-500 group-hover:translate-x-[55%] group-hover:opacity-100" />

                                                <div className="relative p-6">
                                                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                                                        <div className="space-y-1">
                                                            <CardTitle className="text-base md:text-lg">{e.title}</CardTitle>

                                                            <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted-foreground">
                                <span className="inline-flex items-center gap-2">
                                  <CalendarPlus className="h-4 w-4 text-primary" />
                                    {formatDate(e.date)}
                                </span>

                                                                {start ? (
                                                                    <span className="inline-flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-primary" />
                                                                        {formatTimeLocal(start)}
                                  </span>
                                                                ) : (
                                                                    <span className="inline-flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-primary" />
                                    <span className="rounded-full border bg-white/60 px-2.5 py-0.5 text-xs text-muted-foreground">
                                      Time soon
                                    </span>
                                  </span>
                                                                )}

                                                                <span className="inline-flex items-center gap-2">
                                  <MapPin className="h-4 w-4 text-primary" />
                                                                    {e.location}
                                </span>
                                                            </div>
                                                        </div>

                                                        <div className="flex flex-wrap gap-2">
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                disabled={!start}
                                                                title={!start ? "Time not announced yet" : undefined}
                                                                className="rounded-xl border-primary/60 text-primary hover:bg-primary/10 disabled:opacity-60"
                                                                onClick={() =>
                                                                    downloadICS({
                                                                        title: e.title,
                                                                        description: e.description,
                                                                        location: e.location,
                                                                        date: e.date,
                                                                        time: e.time,
                                                                        durationMinutes: e.durationMinutes ?? 90,
                                                                    })
                                                                }
                                                            >
                                                                <CalendarPlus className="mr-2 h-4 w-4" />
                                                                Calendar
                                                            </Button>

                                                            {e.links?.length ? (
                                                                <Button
                                                                    asChild
                                                                    size="sm"
                                                                    variant="outline"
                                                                    className="rounded-xl border-primary/60 text-primary hover:bg-primary/10"
                                                                >
                                                                    <a href={e.links[0].url} target="_blank" rel="noreferrer">
                                                                        {e.links[0].label} <ArrowUpRight className="ml-2 h-4 w-4" />
                                                                    </a>
                                                                </Button>
                                                            ) : null}
                                                        </div>
                                                    </div>

                                                    <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{e.description}</p>

                                                    {e.links?.length && e.links.length > 1 ? (
                                                        <div className="mt-3 flex flex-wrap gap-2">
                                                            {e.links.slice(1).map((l) => (
                                                                <a
                                                                    key={l.url}
                                                                    href={l.url}
                                                                    target="_blank"
                                                                    rel="noreferrer"
                                                                    className="inline-flex items-center gap-1 rounded-full border bg-white/60 px-3 py-1.5 text-xs text-muted-foreground hover:bg-white/80 hover:text-foreground"
                                                                >
                                                                    {l.label} <ArrowUpRight className="h-3.5 w-3.5" />
                                                                </a>
                                                            ))}
                                                        </div>
                                                    ) : null}
                                                </div>
                                            </Card>
                                        </motion.div>
                                    );
                                })
                        ) : (
                            <div className="text-sm text-muted-foreground">
                                No upcoming events yet — check back soon, or{" "}
                                <Link className="text-primary underline underline-offset-4 hover:opacity-90" href="/contact">
                                    propose a talk
                                </Link>
                                .
                            </div>
                        )}
                    </div>
                </motion.section>

                <Separator className="bg-black/10" />

                {/* ===== PAST ===== */}
                <motion.section
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-120px" }}
                    transition={{ staggerChildren: 0.06 }}
                    className="space-y-4"
                >
                    <div className="flex items-center gap-2">
                        <h2 className="text-lg font-semibold">Past</h2>
                        <Badge variant="secondary" className="bg-white/70">
                            {past.length}
                        </Badge>
                    </div>

                    <div className="grid gap-3">
                        {past.length ? (
                            past
                                .slice()
                                .sort((a, b) => {
                                    const at = eventStartDateIfTime(a)?.getTime() ?? new Date(`${a.date}T23:59:59`).getTime();
                                    const bt = eventStartDateIfTime(b)?.getTime() ?? new Date(`${b.date}T23:59:59`).getTime();
                                    return bt - at;
                                })
                                .map((e) => {
                                    const photos = e.photoFolder && e.photoCount ? buildPhotoSrcs(e.photoFolder, e.photoCount) : [];
                                    const { visible, remaining } = buildWall(photos);

                                    // dynamic rows => pick a nice min-height feel
                                    const rowsGuess = Math.ceil(visible.length / 6);
                                    const minH = clamp(rowsGuess * 120, 220, 520);

                                    return (
                                        <motion.div key={e.title} variants={fadeUp}>
                                            <Card className="rounded-[calc(var(--radius)+1rem)] border border-black/10 bg-white/65 overflow-hidden shadow-[0_22px_70px_-55px_rgba(0,0,0,0.35)]">
                                                <CardContent className="p-0">
                                                    {/* Header */}
                                                    <div className="p-5 md:p-6 space-y-4">
                                                        <div className="space-y-2">
                                                            <div className="text-base font-semibold tracking-tight">{e.title}</div>

                                                            <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted-foreground">
                                <span className="inline-flex items-center gap-2">
                                  <CalendarPlus className="h-4 w-4 text-primary" />
                                    {formatDate(e.date)}
                                </span>

                                                                <span className="inline-flex items-center gap-2">
                                  <MapPin className="h-4 w-4 text-primary" />
                                                                    {e.location}
                                </span>

                                                                {photos.length ? (
                                                                    <span className="inline-flex items-center gap-2">
                                    <Images className="h-4 w-4 text-primary" />
                                                                        {photos.length} photos
                                  </span>
                                                                ) : null}
                                                            </div>

                                                            <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">{e.description}</p>
                                                        </div>

                                                        {/* Special thanks cards */}
                                                        {e.specialThanks?.length ? (
                                                            <div className="grid gap-3 md:grid-cols-2">
                                                                {e.specialThanks.map((t) => (
                                                                    <div
                                                                        key={t.name}
                                                                        className="relative overflow-hidden rounded-2xl border border-black/10 bg-white/70 p-4"
                                                                    >
                                                                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[rgba(59,130,246,0.10)] via-transparent to-[rgba(234,88,12,0.08)]" />
                                                                        <div className="relative flex items-start justify-between gap-3">
                                                                            <div className="space-y-1">
                                                                                <div className="text-sm font-semibold">{t.name}</div>
                                                                                {t.note ? <div className="text-xs leading-relaxed text-muted-foreground">{t.note}</div> : null}
                                                                            </div>

                                                                            {t.linkedin ? (
                                                                                <a
                                                                                    href={t.linkedin}
                                                                                    target="_blank"
                                                                                    rel="noreferrer"
                                                                                    className="inline-flex items-center gap-2 rounded-xl border border-black/10 bg-white/80 px-3 py-2 text-xs text-muted-foreground hover:bg-white hover:text-foreground"
                                                                                    aria-label={`${t.name} LinkedIn`}
                                                                                >
                                                                                    <Linkedin className="h-4 w-4" />
                                                                                    LinkedIn
                                                                                </a>
                                                                            ) : null}
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        ) : null}
                                                    </div>

                                                    {/* === PHOTO WALL (ALL TOGETHER in ONE container) === */}
                                                    {photos.length ? (
                                                        <div className="border-t border-black/10 bg-white/40 p-3 md:p-4">
                                                            <div className="flex items-center justify-between gap-3 px-1 pb-3">
                                                                <div className="text-sm font-semibold">Gallery</div>
                                                                <Button
                                                                    variant="outline"
                                                                    className="rounded-xl border-primary/60 text-primary hover:bg-primary/10"
                                                                    onClick={() => openLightbox(e.title, photos, 0)}
                                                                >
                                                                    <Images className="mr-2 h-4 w-4" />
                                                                    View gallery
                                                                </Button>
                                                            </div>

                                                            {/* ONE unified block: no gaps, no individual “cards” */}
                                                            <div
                                                                className={cx(
                                                                    "relative overflow-hidden rounded-3xl border border-black/10 bg-white/60",
                                                                    "shadow-[0_18px_55px_-45px_rgba(0,0,0,0.45)]"
                                                                )}
                                                                style={{ minHeight: minH }}
                                                            >
                                                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[rgba(234,88,12,0.10)] via-transparent to-[rgba(59,130,246,0.08)] opacity-60" />

                                                                {/* This inner grid uses gap-0 so everything is fused together */}
                                                                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-0">
                                                                    {visible.map((src, i) => {
                                                                        const isLast = i === visible.length - 1 && remaining > 0;

                                                                        return (
                                                                            <button
                                                                                key={src}
                                                                                type="button"
                                                                                onClick={() => openLightbox(e.title, photos, i)}
                                                                                className={cx(
                                                                                    "group relative block aspect-square w-full overflow-hidden",
                                                                                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                                                                                )}
                                                                                aria-label={`Open photo ${i + 1}`}
                                                                            >
                                                                                <Image
                                                                                    src={src}
                                                                                    alt=""
                                                                                    fill
                                                                                    sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, (max-width: 1024px) 16vw, 12vw"
                                                                                    className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                                                                                    priority={i === 0}
                                                                                />

                                                                                {/* hairline separators without gaps (feels like one piece) */}
                                                                                <div className="pointer-events-none absolute inset-0 ring-1 ring-white/70" />
                                                                                <div className="pointer-events-none absolute inset-0 ring-1 ring-black/5" />

                                                                                {/* hover glaze */}
                                                                                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-black/10" />

                                                                                {isLast ? (
                                                                                    <div className="absolute inset-0 grid place-items-center bg-black/55">
                                                                                        <div className="rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-foreground">
                                                                                            +{remaining} more
                                                                                        </div>
                                                                                    </div>
                                                                                ) : null}
                                                                            </button>
                                                                        );
                                                                    })}
                                                                </div>

                                                                <div className="flex items-center justify-between px-4 py-3">
                                                                    <div className="text-xs text-muted-foreground inline-flex items-center gap-2">
                                                                        <Maximize2 className="h-3.5 w-3.5" />
                                                                        Click any photo to open the gallery • {photos.length} photos
                                                                    </div>
                                                                    <div className="text-xs text-muted-foreground">Swipe / arrows inside</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ) : null}
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    );
                                })
                        ) : (
                            <div className="text-sm text-muted-foreground">No past events yet.</div>
                        )}
                    </div>

                    {/* MICRO CTA */}
                    <Card className="relative overflow-hidden rounded-[calc(var(--radius)+1rem)] border border-black/10 bg-white/70">
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[rgba(59,130,246,0.10)] via-transparent to-[rgba(234,88,12,0.08)]" />
                        <CardContent className="relative p-6 md:p-7">
                            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                <div className="space-y-1">
                                    <div className="text-sm font-semibold">Help shape the next Coffee & Talks</div>
                                    <div className="text-sm text-muted-foreground">Want a topic? Want to speak? We’ll help you prepare.</div>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    <Button asChild className="rounded-xl">
                                        <Link href="/contact">Propose a talk</Link>
                                    </Button>
                                    <Button asChild variant="outline" className="rounded-xl border-primary/60 text-primary hover:bg-primary/10">
                                        <Link href="/contact">Suggest a topic</Link>
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="text-xs text-muted-foreground">
                        {site.shortName} events are community-run and may change. If you’re traveling, check the details link before coming.
                    </div>
                </motion.section>
            </div>

            {/* ================= LIGHTBOX ================= */}
            {isOpen ? (
                <div className="fixed inset-0 z-50">
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={closeLightbox} aria-hidden="true" />

                    <motion.div
                        initial="hidden"
                        animate="show"
                        variants={lightboxVariants}
                        className="relative mx-auto flex h-full max-w-6xl flex-col justify-center px-4 py-6"
                    >
                        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/30 shadow-2xl">
                            <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-black/30 px-4 py-3">
                                <div className="min-w-0">
                                    <div className="truncate text-sm font-semibold text-white">{lightbox.title ?? "Gallery"}</div>
                                    <div className="text-xs text-white/70">
                                        {lightbox.index + 1} / {lightbox.photos.length}
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="outline"
                                        className="rounded-xl border-white/20 bg-white/5 text-white hover:bg-white/10"
                                        onClick={prevPhoto}
                                        aria-label="Previous photo"
                                    >
                                        <ArrowLeft className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="rounded-xl border-white/20 bg-white/5 text-white hover:bg-white/10"
                                        onClick={nextPhoto}
                                        aria-label="Next photo"
                                    >
                                        <ArrowRight className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="rounded-xl border-white/20 bg-white/5 text-white hover:bg-white/10"
                                        onClick={closeLightbox}
                                        aria-label="Close"
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>

                            <div className="relative aspect-[16/9] w-full">
                                {currentSrc ? (
                                    <Image
                                        src={currentSrc}
                                        alt=""
                                        fill
                                        sizes="(max-width: 768px) 100vw, 1000px"
                                        className="object-contain"
                                        priority
                                    />
                                ) : null}
                            </div>

                            <div className="border-t border-white/10 bg-black/20 p-3">
                                <div className="flex gap-2 overflow-x-auto pb-1">
                                    {lightbox.photos.map((src, i) => (
                                        <button
                                            key={src}
                                            type="button"
                                            onClick={() => setLightbox((s) => ({ ...s, index: i }))}
                                            className={cx(
                                                "relative h-16 w-24 flex-none overflow-hidden rounded-xl border",
                                                i === lightbox.index ? "border-white/60" : "border-white/10 opacity-80 hover:opacity-100"
                                            )}
                                            aria-label={`Open photo ${i + 1}`}
                                        >
                                            <Image src={src} alt="" fill className="object-cover" sizes="96px" />
                                        </button>
                                    ))}
                                </div>
                                <div className="mt-2 text-[11px] text-white/60">Tip: use ← → keys to navigate • Esc to close</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            ) : null}
        </div>
    );
}
