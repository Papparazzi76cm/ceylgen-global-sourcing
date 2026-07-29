export function Legal({ title, body }: { title: string; body: string }) {
  return (
    <article className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="font-serif text-4xl mb-6">{title}</h1>
      <p className="text-muted-foreground whitespace-pre-line leading-relaxed">{body}</p>
    </article>
  );
}
