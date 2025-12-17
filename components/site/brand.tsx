import Image from "next/image";

type BrandProps = {
    tone?: "default" | "onDark";
};

export function Brand({ tone = "default" }: BrandProps) {
    const titleClass =
        tone === "onDark" ? "text-white" : "text-foreground";
    const subtitleClass =
        tone === "onDark" ? "text-white/70" : "text-muted-foreground";

    return (
        <div className="flex items-center gap-3">

            <div className="relative h-10 w-10 overflow-hidden rounded-full bg-white ring-1 ring-black/10">
                <Image
                    src="/logo.svg"
                    alt="Tunisia Java User Group logo"
                    fill
                    className="
            object-cover
            scale-[0.9]
            origin-center
          "
                    priority
                />
            </div>

            <div className="leading-tight">
                <div className={`text-sm font-semibold tracking-tight ${titleClass}`}>
                    Tunisia JUG
                </div>
                <div className={`text-xs ${subtitleClass}`}>
                    Java community
                </div>
            </div>
        </div>
    );
}
