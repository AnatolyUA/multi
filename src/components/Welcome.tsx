type WelcomeProps = {
    value: string
    onChange: (value: string) => void
    onEnter: () => void
}
export const Welcome = ({ value, onChange, onEnter }: WelcomeProps) => {
    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <h1>InakoFed</h1>
                <label>What is your name:</label>
                <input type={'text'} value={value || ''} onChange={(e) => onChange(e.target.value)} />
                <button onClick={onEnter}>Enter</button>
            </div>
        </>
    )
}
