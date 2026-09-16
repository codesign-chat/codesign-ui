import 'styles/ai.module.css'
import { CheckIcon, CopyIcon } from 'lucide-react'
import {
  Commit,
  CommitAuthor,
  CommitAuthorAvatar,
  CommitContent,
  CommitFile,
  CommitFileAdditions,
  CommitFileChanges,
  CommitFileDeletions,
  CommitFileInfo,
  CommitFilePath,
  CommitFileStatus,
  CommitFiles,
  CommitHash,
  CommitHeader,
  CommitInfo,
  CommitMessage,
  CommitMetadata,
  CommitSeparator,
  CommitTimestamp,
} from '../commit.tsx'
import { CommitActions, CommitCopyButton } from '../commit.tsx'

export function Basic() {
  return (
    <Commit style={{ maxWidth: 520 }}>
      <CommitHeader>
        <CommitInfo>
          <CommitMessage>feat: add unstyled AI composites</CommitMessage>
          <CommitMetadata>
            <CommitAuthor>
              <CommitAuthorAvatar initials="CS" />
              codesign-chat
            </CommitAuthor>
            <CommitSeparator />
            <CommitTimestamp date={new Date('2026-09-16')} />
          </CommitMetadata>
        </CommitInfo>
        <CommitActions>
          <CommitHash>b802a03</CommitHash>
          <CommitCopyButton hash="b802a03fe1c2d3">
            {(copied) => (copied ? <CheckIcon size={12} /> : <CopyIcon size={12} />)}
          </CommitCopyButton>
        </CommitActions>
      </CommitHeader>
      <CommitContent>
        <CommitFiles>
          <CommitFile>
            <CommitFileInfo>
              <CommitFileStatus status="added" />
              <CommitFilePath>packages/react/src/ai/reasoning/reasoning.tsx</CommitFilePath>
            </CommitFileInfo>
            <CommitFileChanges>
              <CommitFileAdditions count={221} />
              <CommitFileDeletions count={0} />
            </CommitFileChanges>
          </CommitFile>
          <CommitFile>
            <CommitFileInfo>
              <CommitFileStatus status="modified" />
              <CommitFilePath>packages/react/src/ai/index.ts</CommitFilePath>
            </CommitFileInfo>
            <CommitFileChanges>
              <CommitFileAdditions count={8} />
              <CommitFileDeletions count={1} />
            </CommitFileChanges>
          </CommitFile>
        </CommitFiles>
      </CommitContent>
    </Commit>
  )
}
