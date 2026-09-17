<script lang="ts">
  import { CarouselNextTrigger } from '../../components/carousel/index.ts'

  interface InlineCitationCarouselNextProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: InlineCitationCarouselNextProps = $props()
</script>

<CarouselNextTrigger {...rest} data-scope="inline-citation" data-part="carousel-next">
  {@render children?.()}
</CarouselNextTrigger>
