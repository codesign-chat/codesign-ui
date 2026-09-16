<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types.js'

  export interface DateInputLabelBaseProps extends PolymorphicProps<'label'>, RefAttribute {}
  export interface DateInputLabelProps extends Assign<HTMLProps<'label'>, DateInputLabelBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Codesign } from '../factory/index.js'
  import { useDateInputContext } from './use-date-input-context.js'

  let { ref = $bindable(null), ...props }: DateInputLabelProps = $props()

  const dateInput = useDateInputContext()
  const mergedProps = $derived(mergeProps(dateInput().getLabelProps(), props))
</script>

<Codesign as="label" bind:ref {...mergedProps} />
