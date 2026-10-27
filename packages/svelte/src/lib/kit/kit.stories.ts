import type { Meta } from '@storybook/svelte'
import All from './examples/all.svelte'

const meta = {
  title: 'Screen kit / Overview',
} as Meta

export default meta

export const Overview = {
  render: () => ({
    Component: All,
  }),
}
