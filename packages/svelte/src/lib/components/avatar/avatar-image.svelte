<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface AvatarImageBaseProps extends PolymorphicProps<'img'>, RefAttribute {}
  export interface AvatarImageProps extends HTMLProps<'img'>, AvatarImageBaseProps {}
</script>

<script lang="ts">
  import { Codesign } from '../factory/index.ts'
  import { mergeProps } from '@zag-js/svelte'
  import { useAvatarContext } from './use-avatar-context.ts'

  let { ref = $bindable(null), ...props }: AvatarImageProps = $props()
  const avatar = useAvatarContext()
  const mergedProps = $derived(mergeProps(avatar().getImageProps(), props))
</script>

<Codesign as="img" bind:ref {...mergedProps} />
