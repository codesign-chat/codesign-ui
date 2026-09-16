<script setup lang="ts">
import { ref } from 'vue'
import { Marquee } from '@codesign-ui/vue/marquee'
import styles from 'styles/marquee.module.css'

const items = [
  { name: 'Apple', logo: '🍎' },
  { name: 'Banana', logo: '🍌' },
  { name: 'Cherry', logo: '🍒' },
  { name: 'Grape', logo: '🍇' },
  { name: 'Watermelon', logo: '🍉' },
  { name: 'Strawberry', logo: '🍓' },
]

const loopCount = ref(0)
const completedCount = ref(0)
</script>

<template>
  <div class="stack">
    <Marquee.Root :loop-count="3" :class="styles.Root" @loop-complete="loopCount++" @complete="completedCount++">
      <Marquee.Viewport :class="styles.Viewport">
        <Marquee.Content :class="styles.Content">
          <Marquee.Item v-for="item in items" :key="item.name" :class="styles.Item">
            <span :class="styles.ItemLogo">{{ item.logo }}</span>
            <span :class="styles.ItemName">{{ item.name }}</span>
          </Marquee.Item>
        </Marquee.Content>
      </Marquee.Viewport>
    </Marquee.Root>

    <div>
      <p>Loop completed: {{ loopCount }} times</p>
      <p>Animation completed: {{ completedCount }} times</p>
    </div>
  </div>
</template>
