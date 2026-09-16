<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface MenuContextTriggerBaseProps extends PolymorphicProps<'button'>, RefAttribute {}
  export interface MenuContextTriggerProps extends Assign<HTMLProps<'button'>, MenuContextTriggerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Codesign } from '../factory/index.ts'
  import { useMenuContext } from './use-menu-context.ts'

  let { ref = $bindable(null), ...props }: MenuContextTriggerProps = $props()

  const menu = useMenuContext()
  const mergedProps = $derived(mergeProps(menu().getContextTriggerProps(), props))
</script>

<Codesign as="button" bind:ref {...mergedProps} />
