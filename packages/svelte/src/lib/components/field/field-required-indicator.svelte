<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { Snippet } from 'svelte'

  export interface FieldRequiredIndicatorBaseProps extends PolymorphicProps<'span'>, RefAttribute {
    fallback?: Snippet
  }
  export interface FieldRequiredIndicatorProps extends Assign<HTMLProps<'span'>, FieldRequiredIndicatorBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Codesign } from '../factory/index.ts'
  import { useFieldContext } from './use-field-context.ts'

  let { ref = $bindable(null), ...props }: FieldRequiredIndicatorProps = $props()
  const field = useFieldContext()
  const mergedProps = $derived(mergeProps(field?.()?.getRequiredIndicatorProps() ?? {}, props))
</script>

{#if field?.()?.required}
  <Codesign as="span" bind:ref {...mergedProps}>
    {#if props.children}
      {@render props.children?.()}
    {:else}
      *
    {/if}
  </Codesign>
{:else}
  {@render props.fallback?.()}
{/if}
