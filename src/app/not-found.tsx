import { Button } from "@/components/ui";
export default function NotFound() {
  return (
    <section className="section container empty-state">
      <span className="eyebrow">404 · A SMALL DETOUR</span>
      <h1>
        Let’s get you back
        <br />
        on your path.
      </h1>
      <p>
        This page couldn’t be found. Your next opportunity is still waiting.
      </p>
      <Button href="/courses">Explore our courses</Button>
    </section>
  );
}
