<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { BooleanDefaults } from '../../types.ts'
import type { PolymorphicProps } from '../factory.ts'
import type { RootEmits, RootProps } from './radio-group.types.ts'

export interface RadioGroupRootBaseProps extends RootProps, PolymorphicProps {}
export interface RadioGroupRootProps
  extends
    RadioGroupRootBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
export interface RadioGroupRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useRadioGroup } from './use-radio-group.ts'
import { RadioGroupProvider } from './use-radio-group-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = withDefaults(defineProps<RadioGroupRootProps>(), {
  disabled: undefined,
  invalid: undefined,
  readOnly: undefined,
  required: undefined,
} satisfies BooleanDefaults<RootProps>)

const emits = defineEmits<RadioGroupRootEmits>()

const radioGroup = useRadioGroup(props, emits)
RadioGroupProvider(radioGroup)

useForwardExpose()
</script>

<template>
  <codesign.div v-bind="radioGroup.getRootProps()" :as-child="asChild">
    <slot />
  </codesign.div>
</template>
