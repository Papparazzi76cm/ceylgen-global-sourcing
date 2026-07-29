import { Container, Section } from "@/components/ds";

export function Legal({ title, body }: { title: string; body: string }) {
  return (
    <Section size="sm">
      <Container className="mx-auto max-w-3xl px-0">
        <h1 className="type-h1 mb-6">{title}</h1>
        <p className="type-body text-muted-foreground whitespace-pre-line">{body}</p>
      </Container>
    </Section>
  );
}
