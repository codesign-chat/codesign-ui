<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface TourControlBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface TourControlProps extends HTMLProps<'div'>, TourControlBaseProps {}
</script>

<script lang="ts">
  import { Codesign } from '../factory/index.ts'
  import { tourAnatomy } from './tour.anatomy.ts'

  let { ref = $bindable(null), ...props }: TourControlProps = $props()
</script>

<Codesign as="div" bind:ref {...tourAnatomy.build().control.attrs} {...props} />
