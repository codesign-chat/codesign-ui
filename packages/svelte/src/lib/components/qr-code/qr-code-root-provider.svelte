<script module lang="ts">
  import type { Assign, HTMLProps, RefAttribute } from '$lib/types'
  import type { UseQrCodeReturn } from './use-qr-code.svelte.ts'

  interface RootProviderProps {
    value: UseQrCodeReturn
  }

  export interface QrCodeRootProviderBaseProps extends RootProviderProps, RefAttribute {}
  export interface QrCodeRootProviderProps extends Assign<HTMLProps<'div'>, QrCodeRootProviderBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Codesign } from '../factory/index.ts'
  import { QrCodeProvider } from './use-qr-code-context.ts'

  let { ref = $bindable(null), value, ...props }: QrCodeRootProviderProps = $props()
  const mergedProps = $derived(mergeProps(value().getRootProps(), props))

  QrCodeProvider(() => value())
</script>

<Codesign as="div" bind:ref {...mergedProps} />
