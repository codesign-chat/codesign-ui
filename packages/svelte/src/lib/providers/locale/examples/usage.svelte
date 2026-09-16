<script lang="ts">
  import { useLocaleContext } from '@codesign-ui/svelte/locale'

  const locale = useLocaleContext()
</script>

<pre>{JSON.stringify(locale(), null, 2)}</pre>
