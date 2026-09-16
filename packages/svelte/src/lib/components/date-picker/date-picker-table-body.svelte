<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types.js'

  export interface DatePickerTableBodyBaseProps extends PolymorphicProps<'tbody'>, RefAttribute {}
  export interface DatePickerTableBodyProps extends Assign<HTMLProps<'tbody'>, DatePickerTableBodyBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Codesign } from '../factory/index.js'
  import { useDatePickerContext } from './use-date-picker-context.js'

  let { ref = $bindable(null), ...props }: DatePickerTableBodyProps = $props()

  const datePicker = useDatePickerContext()
  const mergedProps = $derived(mergeProps(datePicker().getTableBodyProps(), props))
</script>

<Codesign as="tbody" bind:ref {...mergedProps} />
