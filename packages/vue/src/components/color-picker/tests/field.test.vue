<script setup lang="ts">
import { ColorPicker, parseColor } from '@codesign-ui/vue/color-picker'
import { Field, type FieldRootProps } from '@codesign-ui/vue/field'

const props = defineProps<FieldRootProps>()
</script>

<template>
  <Field.Root v-bind="props">
    <ColorPicker.Root :default-value="parseColor('#eb5e41')">
      <ColorPicker.Label>Label</ColorPicker.Label>
      <ColorPicker.Control>
        <ColorPicker.ChannelInput channel="hex" />
        <ColorPicker.Trigger>
          <ColorPicker.ValueSwatch />
        </ColorPicker.Trigger>
      </ColorPicker.Control>
      <ColorPicker.HiddenInput />
    </ColorPicker.Root>
    <Field.HelperText>Additional Info</Field.HelperText>
    <Field.ErrorText>Error Info</Field.ErrorText>
  </Field.Root>
</template>
