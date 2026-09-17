<script lang="ts">
  import { CarouselItemGroup } from '../../components/carousel/index.ts'

  interface InlineCitationCarouselContentProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: InlineCitationCarouselContentProps = $props()
</script>

<CarouselItemGroup {...rest} data-scope="inline-citation" data-part="carousel-content">
  {@render children?.()}
</CarouselItemGroup>
