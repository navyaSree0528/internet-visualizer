import { useCallback, useEffect, useState } from 'react'
import { STAGES } from '../data/stages'

const HOP_MS = 1500      // time each packet animation gets
const PAUSE_MS = 2600    // pause between stages when playing

// State machine: stageIndex -> hopIndex -> next stage...
export function useVisualizer() {
  const [stageIndex, setStageIndex] = useState(0)
  const [hopIndex, setHopIndex] = useState(0)
  const [playing, setPlaying] = useState(false)

  const stage = STAGES[stageIndex]
  const hopsDone = hopIndex >= stage.hops.length
  const finished = stageIndex === STAGES.length - 1 && hopsDone

  // Auto-advance timer while playing
  useEffect(() => {
    if (!playing) return undefined
    let t
    if (!hopsDone) {
      t = setTimeout(() => setHopIndex((h) => h + 1), HOP_MS)
    } else if (!finished) {
      t = setTimeout(() => {
        setStageIndex((s) => Math.min(s + 1, STAGES.length - 1))
        setHopIndex(0)
      }, PAUSE_MS)
    } else {
      setPlaying(false)
    }
    return () => clearTimeout(t)
  }, [playing, hopIndex, stageIndex, hopsDone, finished])

  const stop = useCallback(() => setPlaying(false), [])

  const next = useCallback(() => {
    stop()
    if (!hopsDone) setHopIndex((h) => h + 1)
    else if (stageIndex < STAGES.length - 1) {
      setStageIndex(stageIndex + 1)
      setHopIndex(0)
    }
  }, [hopsDone, stageIndex, stop])

  const prev = useCallback(() => {
    stop()
    if (hopIndex > 0) setHopIndex(hopIndex - 1)
    else if (stageIndex > 0) {
      setStageIndex(stageIndex - 1)
      setHopIndex(STAGES[stageIndex - 1].hops.length) // show previous stage fully played
    }
  }, [hopIndex, stageIndex, stop])

  const reset = useCallback(() => {
    stop()
    setStageIndex(0)
    setHopIndex(0)
  }, [stop])

  const restart = useCallback(() => {
    setStageIndex(0)
    setHopIndex(0)
    setPlaying(true)
  }, [])

  const jump = useCallback(
    (i) => {
      stop()
      setStageIndex(i)
      setHopIndex(0)
    },
    [stop],
  )

  const toggle = useCallback(() => {
    if (finished) restart()
    else setPlaying((p) => !p)
  }, [finished, restart])

  return {
    stageIndex,
    hopIndex,
    stage,
    playing,
    finished,
    next,
    prev,
    reset,
    restart,
    jump,
    toggle,
    total: STAGES.length,
  }
}
