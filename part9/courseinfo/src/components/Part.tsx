import React from 'react';
import { CoursePart } from '../type';

const Part = ({ part }: { part: CoursePart }) => {
    switch (part.type) {
        case 'normal':
            return (
                <div>
                    {' '}
                    <b>
                        {part.name} {part.exerciseCount}
                    </b>{' '}
                    <br />
                    <i>{part.description} </i>
                </div>
            );

        case 'groupProject':
            return (
                <div>
                    {' '}
                    <b>
                        {part.name} {part.exerciseCount}
                    </b>{' '}
                    <br />
                    project exercises{part.groupProjectCount}
                </div>
            );

        case 'submission':
            return (
                <div>
                    {' '}
                    <b>
                        {part.name} {part.exerciseCount}
                    </b>{' '}
                    <br />
                    <i>{part.description} </i> <br />
                    submit to {part.exerciseSubmissionLink}
                </div>
            );
        default:
            return <div>hello</div>;
    }
};

export default Part;
