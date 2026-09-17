import 'styles/ai.module.css'
import { DownloadIcon, XIcon } from 'lucide-react'
import {
  Artifact,
  ArtifactAction,
  ArtifactActions,
  ArtifactContent,
  ArtifactDescription,
  ArtifactHeader,
  ArtifactTitle,
} from '../artifact.tsx'

export function Basic() {
  return (
    <Artifact style={{ maxWidth: 520 }}>
      <ArtifactHeader>
        <div>
          <ArtifactTitle>Auth flow diagram</ArtifactTitle>
          <ArtifactDescription>Generated from the conversation</ArtifactDescription>
        </div>
        <ArtifactActions>
          <ArtifactAction tooltip="Download SVG">
            <DownloadIcon />
          </ArtifactAction>
          <ArtifactAction tooltip="Close">
            <XIcon />
          </ArtifactAction>
        </ArtifactActions>
      </ArtifactHeader>
      <ArtifactContent>
        <svg
          aria-hidden="true"
          height="120"
          role="img"
          style={{ display: 'block', margin: '0 auto' }}
          viewBox="0 0 320 120"
          width="100%"
        >
          <rect fill="none" height="98" stroke="#eb5e41" width="318" x="1" y="1" />
          <text fill="currentColor" style={{ fontSize: 13 }} textAnchor="middle" x="160" y="64">
            login → session → redirect
          </text>
        </svg>
      </ArtifactContent>
    </Artifact>
  )
}
