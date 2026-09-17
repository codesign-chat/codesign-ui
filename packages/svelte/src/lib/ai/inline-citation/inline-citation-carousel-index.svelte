<script lang="ts">
  import { CarouselProgressText } from '../../components/carousel/index.ts'

  interface InlineCitationCarouselIndexProps {}

  let { ...rest }: InlineCitationCarouselIndexProps = $props()
</script>

<CarouselProgressText {...rest} data-scope="inline-citation" data-part="carousel-index" />
