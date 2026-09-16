<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface NavigationMenuArrowBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface NavigationMenuArrowProps extends Assign<HTMLProps<'div'>, NavigationMenuArrowBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Codesign } from '../factory/index.ts'
  import { useNavigationMenuContext } from './use-navigation-menu-context.ts'

  let { ref = $bindable(null), ...props }: NavigationMenuArrowProps = $props()

  const navigationMenu = useNavigationMenuContext()
  const mergedProps = $derived(mergeProps(navigationMenu().getArrowProps(), props))
</script>

<Codesign as="div" bind:ref {...mergedProps} />
