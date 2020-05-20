/* 
* @file Job
*/

function Job({name, status, time}) {
    return (
        <div>
            <span>{status}</span>
            <span>{name}</span>
            <span>{moment(time).format('hh:mm:ss')}</span>
        </div>
    );
}

/* 
 * Stage
*/
function Stage({title, jobs = []}) {
    const jobList = jobs.map(jobs => (
        <Job
            key={jobs.time}
            {...jobs}
        />
    ));
    return (
        <li>
            <h2>{title}</h2>
            {jobList}
        </li>
    );
};

/* 
 * PipeLine
*/
function PipeLine({stages = []}) {
    const stateList = stages.map(stage => (
        <Stage
            key={stage.title}
            {...stage}
        />
    ));
    return (
        <ul>
            {stateList.join(<div class="inline-block-line"></div>)}
        </ul>
    );
}

export default PipeLine;