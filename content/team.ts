export type TeamMember = {
    name: string;
    role: string;
    bio: string;
    founder?: boolean;
    links?: { label: string; url: string }[];
};

export const team: TeamMember[] = [
    {
        name: "Yassin Ghariani",
        role: "Founder",
        founder: true,
        bio: "Building Tunisia’s Java community — meetups, talks, and a welcoming space for all levels.",
        links: [{ label: "Profile", url: "https://www.linkedin.com/in/yassin-ghariani-ba5687151" }],
    },
];
