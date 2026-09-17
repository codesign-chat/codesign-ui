import 'styles/ai.module.css'
import { BookmarkIcon } from 'lucide-react'
import { Checkpoint, CheckpointIcon, CheckpointTrigger } from '../checkpoint.tsx'

export function Basic() {
  return (
    <Checkpoint style={{ maxWidth: 420 }}>
      <CheckpointIcon>
        <BookmarkIcon />
      </CheckpointIcon>
      <CheckpointTrigger tooltip="Restore the conversation to this point">Restore checkpoint</CheckpointTrigger>
      <CheckpointTrigger>Branch here</CheckpointTrigger>
    </Checkpoint>
  )
}
