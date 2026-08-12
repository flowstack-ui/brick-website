"use client";

import "../../app/.generated/previews/carousel.css";

import * as Carousel from "@flowstack-ui/brick/carousel";
import { Surface } from "@flowstack-ui/brick/surface";
import { Text } from "@flowstack-ui/brick/text";

const slides = [
  ["design", "Design system", "Turn shared decisions into finished interfaces."],
  ["build", "Build confidently", "Compose stable public parts without private coupling."],
  ["ship", "Ship accessibly", "Keep keyboard, touch, motion, and appearance behavior intact."],
] as const;

export default function CarouselPreview() {
  return (
    <Carousel.Root defaultValue="design" aria-label="Brick product qualities">
      <Carousel.Viewport>
        <Carousel.Track>
          {slides.map(([value, title, description]) => (
            <Carousel.Slide value={value} label={title} key={value}>
              <Surface bordered inset="lg" level="raised">
                <Text as="h3" variant="title-md">{title}</Text>
                <Text tone="secondary">{description}</Text>
              </Surface>
            </Carousel.Slide>
          ))}
        </Carousel.Track>
      </Carousel.Viewport>
      <Carousel.Navigation><Carousel.Previous /><Carousel.Next /></Carousel.Navigation>
      <Carousel.Controls><Carousel.Picker>{slides.map(([value]) => <Carousel.PickerItem value={value} key={value} />)}</Carousel.Picker></Carousel.Controls>
    </Carousel.Root>
  );
}
