<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface PasswordInputVisibilityTriggerBaseProps extends PolymorphicProps<'button'>, RefAttribute {}
  export interface PasswordInputVisibilityTriggerProps extends Assign<
    HTMLProps<'button'>,
    PasswordInputVisibilityTriggerBaseProps
  > {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Codesign } from '../factory/index.ts'
  import { usePasswordInputContext } from './use-password-input-context.ts'

  let { ref = $bindable(null), ...props }: PasswordInputVisibilityTriggerProps = $props()
  const passwordInput = usePasswordInputContext()
  const mergedProps = $derived(mergeProps(passwordInput().getVisibilityTriggerProps(), props))
</script>

<Codesign as="button" bind:ref {...mergedProps} />
