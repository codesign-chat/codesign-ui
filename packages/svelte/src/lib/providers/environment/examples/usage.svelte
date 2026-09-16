<script lang="ts">
  import { useEnvironmentContext } from '@codesign-ui/svelte/environment'

  const environment = useEnvironmentContext()
</script>

<pre>{JSON.stringify(environment().getRootNode(), null, 2)}</pre>
