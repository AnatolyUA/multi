import { Task } from '../progress.ts'
import { useEffect, useState } from 'react'

type OptionsProps = {
    task: Task
    onAnswer: (answer: number) => void
    state: 'error' | 'success' | 'warning'
}

export const Options = ({ task, state, onAnswer }: OptionsProps) => {
    const [options, setOptions] = useState(getOptions(task))
    useEffect(() => {
        setOptions(getOptions(task))
    }, [task])

    return (
        <div className={'options'}>
            {options.map((option) => (
                <button key={option} className={'mono'} onClick={() => onAnswer(option)} disabled={state !== 'warning'}>
                    {option}
                </button>
            ))}
        </div>
    )
}

function getOptions(task: Task): number[] {
    const [a, b] = task
    const correct = a * b
    const set = new Set<number>([correct])
    set.add(correct + a)
    set.add(correct + b)
    if (correct > 10) {
        set.add(correct - a)
        set.add(correct - b)
    }

    while (set.size < 8) {
        set.add(Math.floor(Math.random() * correct * 2))
    }
    const res = Array.from(set)
    shuffle(res)
    return res
}

function shuffle<T>(array: T[]) {
    let currentIndex = array.length

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
        // Pick a remaining element...
        const randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--

        // And swap it with the current element.
        ;[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
    }
}
