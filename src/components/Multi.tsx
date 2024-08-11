import { storage } from '../storage.ts'
import { getRandomTask, normalizeName, populateStats, Progress, updateLevel, updateStats } from '../progress.ts'
import { useStateWithStorage } from '../hooks/use-state-with-storage.ts'
import { useEffect, useState } from 'react'
import { Options } from './Options.tsx'

type MultiProps = {
    progress: Progress
    onExit: () => void
}
export const Multi = ({ progress, onExit }: MultiProps) => {
    if (!progress.Stats) {
        progress = populateStats(progress)
    }
    const [current, setCurrent] = useStateWithStorage<Progress>(normalizeName(progress.Name), progress)

    const [task, setTask] = useState(getRandomTask(progress))
    const [time, setTime] = useState(new Date())

    const [answer, setAnswer] = useState<string>('?')
    const [correctness, setCorrectness] = useState<'error' | 'success' | 'warning'>('warning')

    useEffect(() => {
        setTime(new Date())
    }, [task])

    return (
        <div>
            <h4>Welcome {current.Name}</h4>
            <div className={'mono task'}>
                {task[0]} x {task[1]} = <span className={correctness}>{answer}</span>
            </div>
            <div>
                <Options
                    task={task}
                    state={correctness}
                    onAnswer={(answer) => {
                        const newState = updateStats(current, task, answer, new Date().getTime() - time.getTime())
                        console.log('newState', newState.Stats.slice(0, 10))
                        setCurrent(newState)
                        setAnswer(answer.toString())
                        const correct = answer === task[0] * task[1] ? 'success' : 'error'
                        setCorrectness(correct)
                        if (correct === 'success') {
                            setTimeout(() => {
                                setCurrent(updateLevel(current))
                                setTask(getRandomTask(current))
                                setAnswer('?')
                                setCorrectness('warning')
                            }, 1000)
                        } else {
                            setTimeout(() => {
                                setAnswer('?')
                                setCorrectness('warning')
                            }, 1000)
                        }
                    }}
                />
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
