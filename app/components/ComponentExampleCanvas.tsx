import { ComponentPreview } from "@/app/components/ComponentPreview";
import { componentExampleMode } from "@/app/lib/component-example-layout";

export function ComponentExampleCanvas({ slug }: { slug: string }) {
  const mode = componentExampleMode(slug);

  return (
    <div className="example-canvas" data-layout={mode}>
      <div className="example-specimen">
        <ComponentPreview slug={slug} />
      </div>
    </div>
  );
}
