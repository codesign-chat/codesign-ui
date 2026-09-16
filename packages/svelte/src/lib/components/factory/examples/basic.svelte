<script lang="ts">
  import Codesign from '../factory.svelte'

  interface Props {
    onClickParent?: () => void
    onClickChild?: () => void
  }

  const { onClickParent, onClickChild }: Props = $props()
</script>

<Codesign
  as="div"
  id="parent"
  data-testid="parent"
  data-part="parent"
  class="parent"
  style="background: red"
  onclick={onClickParent}
>
  {#snippet asChild(props)}
    <Codesign
      as="span"
      {...props({ id: 'child', class: 'child', style: 'color: blue', onclick: onClickChild })}
      data-testid="child"
      data-part="child"
    >
      Codesign UI
    </Codesign>
  {/snippet}
</Codesign>
