<script lang="ts">
  import { CarouselRoot } from '../../components/carousel/index.ts'

  interface InlineCitationCarouselProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: InlineCitationCarouselProps = $props()
</script>

<CarouselRoot {...(rest as any)} data-scope="inline-citation" data-part="carousel">
  {@render children?.()}
</CarouselRoot>
