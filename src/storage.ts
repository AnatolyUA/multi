export const storage = {
    setItem<T>(key: string, value: T) {
        const v = JSON.stringify(value)
        sessionStorage.setItem(key, v)
        localStorage.setItem(key, v)
    },
    getItem<T>(key: string): T | null {
        return JSON.parse(sessionStorage.getItem(key) || localStorage.getItem(key) || 'null') as T
    }
}
