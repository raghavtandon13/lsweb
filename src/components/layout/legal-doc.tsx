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
      <PageHero eyebrow={eyebrow} title={title} body={`Last updated ${updated}.`} />
      <Container className="py-16">
        <article className="prose-legal mx-auto max-w-3xl">{children}</article>
      </Container>
    </>
  );
}
