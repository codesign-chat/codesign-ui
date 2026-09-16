<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types.js'

  export interface DatePickerControlBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface DatePickerControlProps extends Assign<HTMLProps<'div'>, DatePickerControlBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Codesign } from '../factory/index.js'
  import { useDatePickerContext } from './use-date-picker-context.js'

  let { ref = $bindable(null), ...props }: DatePickerControlProps = $props()

  const datePicker = useDatePickerContext()
  const mergedProps = $derived(mergeProps(datePicker().getControlProps(), props))
</script>

<Codesign as="div" bind:ref {...mergedProps} />
