import 'styles/ai.module.css'
import { ChevronDownIcon } from 'lucide-react'
import {
  Sandbox,
  SandboxContent,
  SandboxHeader,
  SandboxTabContent,
  SandboxTabs,
  SandboxTabsBar,
  SandboxTabsList,
  SandboxTabsTrigger,
} from '../sandbox.tsx'

export function Basic() {
  return (
    <Sandbox style={{ maxWidth: 560 }}>
      <SandboxHeader indicator={<ChevronDownIcon />} state="output-available" title="counter-widget" />
      <SandboxContent>
        <SandboxTabs defaultValue="preview">
          <SandboxTabsBar>
            <SandboxTabsList>
              <SandboxTabsTrigger value="preview">Preview</SandboxTabsTrigger>
              <SandboxTabsTrigger value="code">Code</SandboxTabsTrigger>
            </SandboxTabsList>
          </SandboxTabsBar>
          <SandboxTabContent value="preview">
            <iframe
              sandbox="allow-scripts"
              srcDoc={`<!doctype html><style>body{font-family:system-ui;display:grid;place-items:center;height:100vh;margin:0}button{padding:.5rem 1rem;border:1px solid #eb5e41;border-radius:.5rem;background:#fff;color:#eb5e41;font-size:1rem;cursor:pointer}</style><button onclick="this.textContent='Clicked '+(++window.n||1)">Click me</button>`}
              style={{ border: 'none', display: 'block', minHeight: '10rem', width: '100%' }}
              title="Counter preview"
            />
          </SandboxTabContent>
          <SandboxTabContent value="code">
            <pre style={{ margin: 0, padding: '1rem' }}>{'<button>Click me</button>'}</pre>
          </SandboxTabContent>
        </SandboxTabs>
      </SandboxContent>
    </Sandbox>
  )
}

export function Failure() {
  return (
    <Sandbox defaultOpen={false} style={{ maxWidth: 560 }}>
      <SandboxHeader indicator={<ChevronDownIcon />} state="output-error" title="weather-widget" />
      <SandboxContent>
        <SandboxTabs defaultValue="code">
          <SandboxTabsBar>
            <SandboxTabsList>
              <SandboxTabsTrigger value="code">Code</SandboxTabsTrigger>
            </SandboxTabsList>
          </SandboxTabsBar>
          <SandboxTabContent value="code">
            <pre style={{ margin: 0, padding: '1rem' }}>{'fetchWeather() // -> 500'}</pre>
          </SandboxTabContent>
        </SandboxTabs>
      </SandboxContent>
    </Sandbox>
  )
}
