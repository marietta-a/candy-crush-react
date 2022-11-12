const ScoreBoard: React.FC<{
    score: number
}> = ({score}) => {

    return (
        <div className='score-board'>
            <h2>{score}</h2>
        </div>
    )

}


export default ScoreBoard