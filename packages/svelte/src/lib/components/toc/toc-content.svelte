<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '../../types'

  export interface TocContentBaseProps extends PolymorphicProps<'article'>, RefAttribute {}
  export interface TocContentProps extends Assign<HTMLProps<'article'>, TocContentBaseProps> {}
</script>

<script lang="ts">
  import { Codesign } from '../factory'

  let { ref = $bindable(null), ...props }: TocContentProps = $props()
</script>

<Codesign as="article" bind:ref {...props} />
