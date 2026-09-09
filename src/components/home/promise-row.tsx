import { Banknote, Clock, LockKeyhole, Scale } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

const items = [
  {
    icon: Clock,
    title: "2-minute start",
    body: "Name and mobile. OTP next. No branch visit to begin.",
  },
  {
    icon: Scale,
    title: "Compare lenders",
    body: "See amount, interest and fees from partner NBFCs in one place.",
  },
  {
    icon: Banknote,
    title: "8 loan types",
    body: "Payday to gold, FD, mutual funds and business working capital.",
  },
  {
    icon: LockKeyhole,
    title: "Consent first",
    body: "Credit check happens only after you tick. Data stays encrypted.",
  },
];

export function PromiseRow() {
  return (
    <section className="bg-white">
      <Container className="grid grid-cols-1 gap-4 pt-10 pb-0 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5 lg:pt-12">
        {items.map((item, i) => (
          <Reveal key={item.title} delay={i * 70} className="h-full">
            <article className="flex h-full gap-3 rounded-2xl border border-line bg-ivory/70 p-4 sm:flex-col sm:gap-0 sm:p-5">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gold-wash text-navy">
                <item.icon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-lg font-semibold text-navy sm:mt-3">{item.title}</h3>
                <p className="mt-1 text-[15px] leading-6 text-ink">{item.body}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </Container>
    </section>
  );
}
