<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface PinInputLabelBaseProps extends PolymorphicProps<'label'>, RefAttribute {}
  export interface PinInputLabelProps extends Assign<HTMLProps<'label'>, PinInputLabelBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Codesign } from '../factory/index.ts'
  import { usePinInputContext } from './use-pin-input-context.ts'

  let { ref = $bindable(null), ...props }: PinInputLabelProps = $props()
  const pinInput = usePinInputContext()
  const mergedProps = $derived(mergeProps(pinInput().getLabelProps(), props))
</script>

<Codesign as="label" bind:ref {...mergedProps} />
