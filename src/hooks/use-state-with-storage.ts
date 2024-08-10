import React, { useEffect, useState } from 'react'
import { storage } from '../storage.ts'

export const useStateWithStorage = <T>(key: string, defaultValue: T): [T, React.Dispatch<React.SetStateAction<T>>] => {
    // only if both default value and storage value are objects { ...defaultValue, ...storageValue }
    const storedValue = storage.getItem<T>(key)
    let initialValue = defaultValue

    if (typeof defaultValue === 'object' && typeof storedValue === 'object') {
        initialValue = { ...initialValue, ...storedValue }
    }

    const [value, setValue] = useState<T>(initialValue)

    useEffect(() => {
        // storing input name
        storage.setItem(key, value)
    }, [key, value])

    return [value, setValue]
}
