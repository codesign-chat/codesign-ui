<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { Snippet } from 'svelte'

  export interface ClipboardIndicatorBaseProps extends PolymorphicProps<'div'>, RefAttribute {
    copied?: Snippet
  }
  export interface ClipboardIndicatorProps extends Assign<HTMLProps<'div'>, ClipboardIndicatorBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Codesign } from '../factory/index.ts'
  import { useClipboardContext } from './use-clipboard-context.ts'

  let { ref = $bindable(null), children, copied, ...localProps }: ClipboardIndicatorProps = $props()

  const clipboard = useClipboardContext()
  const mergedProps = $derived(mergeProps(clipboard().getIndicatorProps({ copied: clipboard().copied }), localProps))
</script>

<Codesign as="div" bind:ref {...mergedProps}>
  {#if clipboard().copied && copied}
    {@render copied()}
  {:else if children}
    {@render children()}
  {/if}
</Codesign>
