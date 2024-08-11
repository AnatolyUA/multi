type WelcomeProps = {
    value: string
    onChange: (value: string) => void
    onEnter: () => void
}
export const Welcome = ({ value, onChange, onEnter }: WelcomeProps) => {
    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '95%' }}>
                <h1>InakoFed</h1>
                <label>What is your name:</label>
                <input
                    type={'text'}
                    value={value || ''}
                    onChange={(e) => onChange(e.target.value)}
                    style={{ padding: '3px 5px', fontSize: '2em', maxWidth: 'calc(90vw - 3em)', margin: '1em 0' }}
                />
                <button onClick={onEnter}>Enter</button>
            </div>
        </>
    )
}
