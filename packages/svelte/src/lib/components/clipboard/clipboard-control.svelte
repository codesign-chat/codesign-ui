<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface ClipboardControlBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface ClipboardControlProps extends Assign<HTMLProps<'div'>, ClipboardControlBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Codesign } from '../factory/index.ts'
  import { useClipboardContext } from './use-clipboard-context.ts'

  let { ref = $bindable(null), ...props }: ClipboardControlProps = $props()

  const clipboard = useClipboardContext()
  const mergedProps = $derived(mergeProps(clipboard().getControlProps(), props))
</script>

<Codesign as="div" bind:ref {...mergedProps} />
