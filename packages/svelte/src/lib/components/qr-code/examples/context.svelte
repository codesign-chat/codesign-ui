<script lang="ts">
  import { QrCode } from '@codesign-ui/svelte/qr-code'
  import type { UseQrCodeContext } from '@codesign-ui/svelte/qr-code'
</script>

<QrCode.Root defaultValue="http://codesign.chat">
  <QrCode.Context>
    {#snippet api(qrCode: UseQrCodeContext)}
      <QrCode.Frame>
        {#if qrCode().value === 'http://codesign.chat'}
          <QrCode.Pattern />
        {:else}
          <p>Loading...</p>
        {/if}
      </QrCode.Frame>
    {/snippet}
  </QrCode.Context>
</QrCode.Root>
