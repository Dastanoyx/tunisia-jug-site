export type EventLink = { label: string; url: string };

export type Event = {
    title: string;
    status: "upcoming" | "past";
    date: string;
    time?: string;
    durationMinutes?: number;
    location: string;
    description: string;
    links?: EventLink[];
};

export const events: Event[] = [
    {
        title: "Tunisia JUG Kickoff Meetup",
        status: "upcoming",
        date: "2026-01-03",
        time: "12:00",
        durationMinutes: 90,
        location: "Tunis",
        description: "An informal kickoff to meet each other, share the community vision, and start building Tunisia JUG together.",
        links: [{ label: "RSVP (soon)", url: "#" }],
    },
];
