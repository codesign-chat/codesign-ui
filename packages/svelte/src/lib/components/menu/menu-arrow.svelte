<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface MenuArrowBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface MenuArrowProps extends Assign<HTMLProps<'div'>, MenuArrowBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Codesign } from '../factory/index.ts'
  import { useMenuContext } from './use-menu-context.ts'

  let { ref = $bindable(null), ...props }: MenuArrowProps = $props()

  const menu = useMenuContext()
  const mergedProps = $derived(mergeProps(menu().getArrowProps(), props))
</script>

<Codesign as="div" bind:ref {...mergedProps} />
