<script lang="ts">
import type { ImgHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface AvatarImageBaseProps extends PolymorphicProps {}
export interface AvatarImageProps
  extends
    AvatarImageBaseProps,
    /**
     * @vue-ignore
     */
    ImgHTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { useAvatarContext } from './use-avatar-context.ts'

defineProps<AvatarImageProps>()
const avatar = useAvatarContext()

useForwardExpose()
</script>

<template>
  <codesign.img v-bind="avatar.getImageProps()" :as-child="asChild" />
</template>
