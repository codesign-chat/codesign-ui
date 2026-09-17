<script lang="ts">
  import { CarouselItem } from '../../components/carousel/index.ts'

  interface InlineCitationCarouselItemProps {
    index: number
    children?: import('svelte').Snippet
  }

  let { index, children, ...rest }: InlineCitationCarouselItemProps = $props()
</script>

<CarouselItem {...rest} data-scope="inline-citation" data-part="carousel-item" index={index}>
  {@render children?.()}
</CarouselItem>
