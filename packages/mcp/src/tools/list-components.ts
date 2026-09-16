import { z } from 'zod'
import { fetchComponentList } from '../lib/fetch.js'
import { FRAMEWORKS, type Tool } from '../lib/types.js'

export const listComponentsTool: Tool<{ componentList: string[] }> = {
  name: 'list_components',
  description:
    'List all available components in Codesign UI based on the framework type. This tool retrieves the names of all available Codesign UI components.',
  async exec(server, { name, description }) {
    server.registerTool(
      name,
      {
        description,
        inputSchema: {
          framework: z.enum(FRAMEWORKS).describe('The framework type to list components for.'),
        },
      },
      async ({ framework }) => {
        const componentList = await fetchComponentList(framework)

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(componentList, null, 2),
            },
          ],
        }
      },
    )
  },
}
