
/** Renders an individual score report as a row
 * in the table defined by ReportList.
 */

const ReportCard = ({ title, lastScore, bestScore, numQuestions }) => {

    const lastPercent = Math.round(100 * (+lastScore / +numQuestions));
    const bestPercent = Math.round(100 * (+bestScore / +numQuestions));

    return (
        <tr>
            <td>{title}</td>
            <td>{lastScore}/{numQuestions} ({lastPercent}%)</td>
            <td>{bestScore}/{numQuestions} ({bestPercent}%)</td>
        </tr>
    );
}

export default ReportCard;