<script lang="ts">
  import { Marquee, useMarquee } from '@codesign-ui/svelte/marquee'
  import button from 'styles/button.module.css'
  import styles from 'styles/marquee.module.css'

  const items = [
    { name: 'Apple', logo: '🍎' },
    { name: 'Banana', logo: '🍌' },
    { name: 'Cherry', logo: '🍒' },
    { name: 'Grape', logo: '🍇' },
    { name: 'Watermelon', logo: '🍉' },
    { name: 'Strawberry', logo: '🍓' },
  ]

  const id = $props.id()
  const marquee = useMarquee(() => ({ id }))
</script>

<div class="stack">
  <Marquee.RootProvider value={marquee} class={styles.Root}>
    <Marquee.Viewport class={styles.Viewport}>
      <Marquee.Content class={styles.Content}>
        {#each items as item}
          <Marquee.Item class={styles.Item}>
            <span class={styles.ItemLogo}>{item.logo}</span>
            <span class={styles.ItemName}>{item.name}</span>
          </Marquee.Item>
        {/each}
      </Marquee.Content>
    </Marquee.Viewport>
  </Marquee.RootProvider>

  <div class="hstack">
    <button class={button.Root} onclick={() => marquee().pause()}>Pause</button>
    <button class={button.Root} onclick={() => marquee().resume()}>Resume</button>
  </div>
</div>
