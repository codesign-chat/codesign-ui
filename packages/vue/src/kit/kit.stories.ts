import type { Meta } from '@storybook/vue3-vite'
import All from './examples/all.vue'

const meta: Meta = {
  title: 'Screen kit / Overview',
}

export default meta

export const Overview = {
  render: () => ({
    components: { All },
    template: '<All />',
  }),
}
