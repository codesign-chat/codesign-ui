<script lang="ts">
  import { setContext } from 'svelte'
  import { chainOfThoughtKey } from './chain-of-thought-context.svelte.ts'

  interface ChainOfThoughtProps {
    defaultOpen?: boolean
    children?: import('svelte').Snippet
  }

  let { defaultOpen = false, children, ...rest }: ChainOfThoughtProps = $props()
  let isOpen = $state(defaultOpen)

  setContext(chainOfThoughtKey, {
    get isOpen() {
      return isOpen
    },
    setIsOpen(next: boolean) {
      isOpen = next
    },
  })
</script>

<div {...rest} data-scope="chain-of-thought" data-part="root">
  {@render children?.()}
</div>
