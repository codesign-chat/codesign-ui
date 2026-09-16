<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface SelectValueTextBaseProps extends PolymorphicProps<'span'>, RefAttribute {
    placeholder?: string
  }
  export interface SelectValueTextProps extends Assign<HTMLProps<'span'>, SelectValueTextBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Codesign } from '$lib/components/factory'
  import { useSelectContext } from './use-select-context.ts'

  let { ref = $bindable(null), placeholder, children, ...props }: SelectValueTextProps = $props()
  const select = useSelectContext()
  const mergedProps = $derived(mergeProps(select().getValueTextProps(), props))
</script>

<Codesign as="span" bind:ref {...mergedProps}>
  {#if children}
    {@render children()}
  {:else}
    {select().valueAsString || placeholder}
  {/if}
</Codesign>
