import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/ui/container";

export function LegalDoc({
    eyebrow,
    title,
    updated,
    children,
}: {
    eyebrow: string;
    title: string;
    updated: string;
    children: React.ReactNode;
}) {
    return (
        <>
            <PageHero body={`Last updated ${updated}.`} eyebrow={eyebrow} title={title} />
            <Container className="py-10 lg:py-12">
                <article className="prose-legal mx-auto max-w-3xl">{children}</article>
            </Container>
        </>
    );
}
