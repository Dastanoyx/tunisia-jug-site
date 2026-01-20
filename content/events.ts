export type EventLink = { label: string; url: string };

export type Event = {
    title: string;
    date: string;
    time?: string;
    location: string;
    city: string;
    description: string;
    status: "upcoming" | "past";
    links?: EventLink[];
    speakers?: { name: string; title?: string; company?: string }[];
};

export const events: Event[] = [
    {
        title: "Coffee & Talks — Tunisia JUG Kickoff",
        date: "2026-01-03",
        time: "12:00",
        location: "Tunis",
        city: "Tunis",
        description:
            "We officially launched Java User Group Tunisia (JUGT) — a community for Java developers, learners, and tech enthusiasts across Tunisia. Our first Coffee & Talks meetup was simple but powerful: coffee, conversations, networking, and a shared vision to grow the Java ecosystem together.",
        status: "past",
        speakers: [{ name: "Yassin Ghariani", title: "Founder" }],
    },
    {
        title: "Java Origins",
        date: "2026-01-31",
        time: "14:00",
        location: "Tunis",
        city: "Tunis",
        description:
            "A community-driven session exploring the origins of Java, how the language evolved, and the key features that shaped the ecosystem we use today — from the early days to modern Java.",
        status: "upcoming",
        links: [{ label: "RSVP", url: "#" }],
        speakers: [{ name: "Tunisia JUG Community", title: "Community Members" }],
    },
];
