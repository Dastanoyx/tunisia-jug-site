export type EventLink = { label: string; url: string };

export type Speaker = {
    name: string;
    title?: string;
    company?: string;
};

export type SpecialThanks = {
    name: string;
    note?: string;
    linkedin?: string;
};

export type Event = {
    title: string;
    status: "upcoming" | "past";
    date: string;
    time?: string;
    durationMinutes?: number;
    location: string;
    city: string;
    description: string;
    links?: EventLink[];
    speakers?: Speaker[];
    photoCount?: number;
    photoFolder?: string;
    specialThanks?: SpecialThanks[];
};

export const events: Event[] = [
    {
        title: "Coffee & Talks — Tunisia JUG Kickoff",
        date: "2026-01-03",
        time: "12:00",
        location: "Tunis",
        city: "Tunis",
        description:
            "We officially launched Java User Group Tunisia (JUGT) — a community for Java developers, learners, and tech enthusiasts across Tunisia. Our first in-person Coffee & Talks meetup was simple but powerful: coffee, conversations, networking, and a shared vision to grow the Java ecosystem together. From beginners to experienced engineers, everyone is welcome — this is only the beginning.",
        status: "past",
        speakers: [{ name: "Yassin Ghariani", title: "Founder" }],
        photoFolder: "2026-01-03-kickoff",
        photoCount: 8,
        specialThanks: [
            {
                name: "Dan Vega",
                note: "For his support and a warm welcome message that encouraged our members.",
                linkedin: "https://www.linkedin.com/in/danvega/",
            },
            {
                name: "Nacho Cougil",
                note: "For encouraging the creation of this JUG, guiding the process, and supporting the initiative from day one.",
                linkedin: "https://www.linkedin.com/in/icougil/",
            },
        ],
    },
    {
        title: "Java Origins",
        date: "2026-01-31",
        time: "14:00",
        location: "Tunis",
        city: "Tunis",
        description:
            "A community-driven session exploring the history of Java, its evolution, and how major language and platform features shaped the ecosystem we use today.",
        status: "upcoming",
        links: [{ label: "RSVP", url: "#" }],
        speakers: [
            {
                name: "Tunisia JUG Community",
                title: "Community Members",
            },
        ],
    },
];
