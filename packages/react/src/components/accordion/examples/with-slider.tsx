import { Accordion } from '@codesign-ui/react/accordion'
import { Slider } from '@codesign-ui/react/slider'
import { ChevronDownIcon } from 'lucide-react'
import styles from 'styles/accordion.module.css'
import slider from 'styles/slider.module.css'

export const WithSlider = () => {
  return (
    <Accordion.Root className={styles.Root} defaultValue={['codesign-ui']}>
      {items.map((item) => (
        <Accordion.Item className={styles.Item} key={item.value} value={item.value}>
          <Accordion.ItemTrigger className={styles.ItemTrigger}>
            {item.title}
            <Accordion.ItemIndicator className={styles.ItemIndicator}>
              <ChevronDownIcon />
            </Accordion.ItemIndicator>
          </Accordion.ItemTrigger>
          <Accordion.ItemContent className={styles.ItemContent}>
            <div className={styles.ItemBody}>
              {item.content}
              <Slider.Root className={slider.Root}>
                <Slider.Label className={slider.Label}>Slider</Slider.Label>
                <Slider.Control className={slider.Control}>
                  <Slider.Track className={slider.Track}>
                    <Slider.Range className={slider.Range} />
                  </Slider.Track>
                  <Slider.Thumb index={0} className={slider.Thumb}>
                    <Slider.HiddenInput />
                  </Slider.Thumb>
                </Slider.Control>
              </Slider.Root>
            </div>
          </Accordion.ItemContent>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  )
}

const items = [
  {
    value: 'codesign-ui',
    title: 'What is Codesign UI?',
    content: 'A headless component library for building accessible web apps.',
  },
  {
    value: 'getting-started',
    title: 'How to get started?',
    content: 'Install the package and import the components you need.',
  },
  {
    value: 'maintainers',
    title: 'Who maintains this project?',
    content: 'Codesign UI is built on top of Zag.js state machines.',
  },
]
