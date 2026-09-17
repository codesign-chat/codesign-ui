<script lang="ts">
  import { CarouselPrevTrigger } from '../../components/carousel/index.ts'

  interface InlineCitationCarouselPrevProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: InlineCitationCarouselPrevProps = $props()
</script>

<CarouselPrevTrigger {...rest} data-scope="inline-citation" data-part="carousel-prev">
  {@render children?.()}
</CarouselPrevTrigger>
