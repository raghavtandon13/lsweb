import { cn } from "@/lib/cn";

export function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[1760px] px-4 sm:px-6 lg:px-8 xl:px-10", className)}>
      {children}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  body,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn(align === "center" && "mx-auto max-w-3xl text-center")}>
      {eyebrow && (
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-gold-deep">
          {eyebrow}
        </p>
      )}
      <h2 className="font-serif text-4xl leading-tight text-navy sm:text-5xl">{title}</h2>
      {body && (
        <p className={cn("mt-4 text-lg leading-8 text-ink", align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl")}>
          {body}
        </p>
      )}
    </div>
  );
}
