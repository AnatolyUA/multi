export type Progress = {
    Name: string
    Level: number
    Stats: Stat[]
}

export type Task = [number, number]
export type Stat = {
    task: Task
    score: number
}

export function normalizeName(name: string): string {
    return name
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
}
