<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { UseFieldsetReturn } from './use-fieldset.svelte.ts'

  export interface FieldsetRootProviderBaseProps extends PolymorphicProps<'fieldset'>, RefAttribute {
    value: UseFieldsetReturn
  }
  export interface FieldsetRootProviderProps extends Assign<HTMLProps<'fieldset'>, FieldsetRootProviderBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Codesign } from '../factory/index.ts'
  import { FieldsetProvider } from './use-fieldset-context.ts'

  let { ref = $bindable(null), value, ...props }: FieldsetRootProviderProps = $props()

  const mergedProps = $derived(mergeProps(value().getRootProps(), props))

  FieldsetProvider(() => value())
</script>

<Codesign as="fieldset" bind:ref {...mergedProps} />
