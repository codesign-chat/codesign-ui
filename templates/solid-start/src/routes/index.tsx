import { Field } from '@codesign-ui/solid/field'
import { Avatar } from '~/components/avatar'

export default function Home() {
  return (
    <main>
      <h1>Welcome to Codesign UI</h1>
      <Avatar
        name="Christian Schröter"
        src="https://avatars.githubusercontent.com/u/1846056?s=400&u=bc2821d6154517e6f62795b11ffe0e8e001764a5&v=4"
      />
      <Field.Root>
        <Field.Label>Label</Field.Label>
        <Field.Input />
        <Field.HelperText>Some additional Info</Field.HelperText>
        <Field.ErrorText>Error Info</Field.ErrorText>
      </Field.Root>
    </main>
  )
}
