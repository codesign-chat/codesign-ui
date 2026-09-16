<script lang="ts">
  import { FileUpload } from '@codesign-ui/svelte/file-upload'
</script>

<FileUpload.Root
  defaultAcceptedFiles={[new File(['Welcome to Codesign UI Svelte'], 'README.md', { type: 'text/plain' })]}
>
  <FileUpload.Label>File Upload</FileUpload.Label>
  <FileUpload.Trigger>Choose file(s)</FileUpload.Trigger>
  <FileUpload.ItemGroup>
    <FileUpload.Context>
      {#snippet render(context)}
        {#each context().acceptedFiles as file (file.name)}
          <FileUpload.Item {file}>
            <div>📄</div>
            <FileUpload.ItemName />
            <FileUpload.ItemSizeText />
          </FileUpload.Item>
        {/each}
      {/snippet}
    </FileUpload.Context>
  </FileUpload.ItemGroup>
  <FileUpload.HiddenInput />
</FileUpload.Root>
