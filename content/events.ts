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
            "Our first community meetup to meet each other, share ideas, and start building Tunisia’s Java community together. Expect coffee, conversations, networking, and a practical discussion to kick things off.",
        status: "upcoming",
        links: [{ label: "RSVP", url: "#" }],
        speakers: [{ name: "Yassin Ghariani", title: "Founder" }],
    },
];
