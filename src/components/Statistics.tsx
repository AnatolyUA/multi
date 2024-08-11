import { Progress } from '../progress.ts'

type StatisticsProps = {
    progress: Progress
    onClose: () => void
}
export const Statistics = ({ onClose, progress }: StatisticsProps) => {
    return (
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, top: 0 }} className={'background'}>
            <h4>
                Statistics for {progress.Name} (level: {progress.Level})
            </h4>
            <table>
                <thead>
                    <tr>
                        <th>Task</th>
                        <th>Score</th>
                        <th>Tries</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {progress.Stats.filter((s) => s.tries > 0).map((stat, index) => (
                        <tr key={index}>
                            <td>
                                {stat.task[0]} x {stat.task[1]}
                            </td>
                            <td>{stat.score}</td>
                            <td>{stat.tries}</td>
                            <td>{stat.time}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={onClose} style={{ position: 'fixed', top: 10, right: 10 }}>
                Close
            </button>
        </div>
    )
}
