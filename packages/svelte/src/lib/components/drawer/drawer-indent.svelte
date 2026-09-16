<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface DrawerIndentBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface DrawerIndentProps extends Assign<HTMLProps<'div'>, DrawerIndentBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Codesign } from '../factory/index.ts'
  import { useDrawerStackContext } from './use-drawer-stack-context.ts'

  let { ref = $bindable(null), ...props }: DrawerIndentProps = $props()

  const stackApi = useDrawerStackContext()
  const mergedProps = $derived(mergeProps(stackApi().getIndentProps(), props))
</script>

<Codesign as="div" bind:ref {...mergedProps} />
