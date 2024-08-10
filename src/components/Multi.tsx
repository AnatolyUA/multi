import { storage } from '../storage.ts'
import { normalizeName, Progress } from '../progress.ts'
import { useStateWithStorage } from '../hooks/use-state-with-storage.ts'
import { useState } from 'react'

type MultiProps = {
    progress: Progress
    onExit: () => void
}
export const Multi = ({ progress, onExit }: MultiProps) => {
    const [current, setCurrent] = useStateWithStorage<Progress>(normalizeName(progress.Name), progress)
    const [answer, setAnswer] = useState<string>('?')

    return (
        <div>
            <h4>Welcome {current.Name}</h4>
            <div className={'mono task'}>
                99 x 99 = <span>{answer}</span>
            </div>
            <button
                onClick={() => {
                    setCurrent({ ...current })
                    storage.setItem('current', null)
                    onExit()
                }}
                style={{ position: 'absolute', bottom: 10, left: 10 }}
            >
                Exit
            </button>
        </div>
    )
}
