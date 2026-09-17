<script lang="ts">
  interface MSLogoProps {
    provider: string
  }

  let { provider, ...rest }: MSLogoProps = $props()
</script>

<img {...rest} alt="{provider} logo" data-scope="model-selector" data-part="logo" height="12" loading="lazy" src="https://models.dev/logos/{provider}.svg" width="12" />
