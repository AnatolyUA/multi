import { useEffect, useState } from 'react'
import './App.css'
import { storage } from './storage.ts'
import { normalizeName, Progress } from './progress.ts'
import { Welcome } from './components/Welcome.tsx'
import { Multi } from './components/Multi.tsx'

function App() {
    const current = storage.getItem<Progress>('current')
    const [progress, setProgress] = useState(current)
    const [name, setName] = useState(current?.Name || '')

    useEffect(() => {
        if (progress) {
            document.title = progress.Name
        } else {
            document.title = 'Inako-Fed'
        }
    }, [progress])

    return (
        <>
            {!progress && (
                <Welcome
                    value={name}
                    onChange={setName}
                    onEnter={() => {
                        if (!name) {
                            alert('Please enter your name')
                            return
                        }
                        const restored =
                            storage.getItem<Progress>(normalizeName(name)) ||
                            ({
                                Name: name
                            } as Progress)
                        setProgress(restored)
                    }}
                />
            )}
            {progress && <Multi progress={progress} onExit={() => setProgress(null)} />}
        </>
    )
}

export default App
