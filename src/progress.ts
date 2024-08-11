export type Progress = {
    Name: string
    Level: number
    Stats: Stat[]
}

export type Task = [number, number]
export type Stat = {
    task: Task
    score: number
    tries: number
    time: number
}

export function populateStats(progress: Progress): Progress {
    const stats: Stat[] = []
    for (let i = 2; i < 20; i++) {
        for (let j = 2; j < 20; j++) {
            stats.push({
                task: [i, j],
                score: 0,
                tries: 0,
                time: 0
            })
        }
    }
    return {
        ...progress,
        Level: 3,
        Stats: stats
    }
}

export function getRandomTask(progress: Progress): Task {
    const stats = progress.Stats
    const level = progress.Level
    const filtered = stats.filter((stat) => stat.task[0] <= level && stat.task[1] <= level)

    // Calculate weights based on inverse of score and tries
    const weightedTasks = filtered.map((stat) => {
        const scoreWeight = Math.max(1, 10 - stat.score) // Higher weight for lower scores
        const triesWeight = Math.max(1, 10 - stat.tries) // Higher weight for fewer tries
        const weight = scoreWeight * triesWeight
        return { task: stat.task, weight }
    })

    // Calculate the sum of all weights
    const totalWeight = weightedTasks.reduce((sum, task) => sum + task.weight, 0)

    // Generate a random number between 0 and totalWeight
    const random = Math.random() * totalWeight

    // Use the random number to select a task
    let cumulativeWeight = 0
    for (const weightedTask of weightedTasks) {
        cumulativeWeight += weightedTask.weight
        if (random <= cumulativeWeight) {
            return weightedTask.task
        }
    }

    // Fallback to a random task if something goes wrong
    return weightedTasks[Math.floor(Math.random() * weightedTasks.length)].task
}

export function updateStats(progress: Progress, task: Task, answer: number, time: number): Progress {
    const stats = progress.Stats
    const index = stats.findIndex((stat) => stat.task[0] === task[0] && stat.task[1] === task[1])
    const stat = stats[index]
    const correct = task[0] * task[1]
    const score = answer === correct ? 1 : -1
    const tries = 1
    stats[index] = {
        ...stat,
        score: stat.score + score,
        tries: stat.tries + tries,
        time: (stat.time + time) / 2
    }
    return {
        ...progress
    }
}

export function updateLevel(progress: Progress): Progress {
    const filtered = progress.Stats.filter((stat) => stat.task[0] <= progress.Level && stat.task[1] <= progress.Level)
    const correct = filtered.filter((stat) => stat.score > 0)
    const total = filtered.length
    const ratio = correct.length / total
    console.log('ratio', ratio)
    let level = progress.Level
    if (ratio > 0.9) {
        level++
    }
    return {
        ...progress,
        Level: level
    }
}

export function normalizeName(name: string): string {
    return name
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
}
