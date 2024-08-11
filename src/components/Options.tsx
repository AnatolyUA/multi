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

    // Add nearby products
    set.add(a * (b + 1))
    set.add(a * (b - 1))
    set.add((a + 1) * b)
    set.add((a - 1) * b)

    // Add sum and difference if they're positive
    if (a + b !== correct) set.add(a + b)
    if (a - b > 0) set.add(a - b)
    if (b - a > 0) set.add(b - a)

    // Function to generate a random number within a range
    const randomInRange = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min

    // Add random options until we have 8
    while (set.size < 8) {
        let randomOption
        if (Math.random() < 0.5) {
            // 50% chance: number close to correct answer
            randomOption = randomInRange(Math.max(1, correct - 10), correct + 10)
        } else {
            // 50% chance: number within a wider range
            randomOption = randomInRange(Math.max(1, Math.floor(correct / 2)), correct * 2)
        }
        set.add(randomOption)
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
