import { useState } from 'react'
import './App.css'
import { storage } from './storage.ts'
import { normalizeName, Progress } from './progress.ts'
import { Welcome } from './components/Welcome.tsx'
import { Multi } from './components/Multi.tsx'

function App() {
    const current = storage.getItem<Progress>('current')
    const [progress, setProgress] = useState(current)
    const [name, setName] = useState(current?.Name || '')

    return (
        <>
            {!progress && (
                <Welcome
                    value={name}
                    onChange={setName}
                    onEnter={() => {
                        const restored = storage.getItem<Progress>(normalizeName(name)) || { Name: name, Level: 3 }
                        setProgress(restored)
                    }}
                />
            )}
            {progress && <Multi progress={progress} onExit={() => setProgress(null)} />}
        </>
    )
}

export default App
