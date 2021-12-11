import React from 'react';

interface TotalProps {
    name: string;
    exerciseCount: number;
}

const Total = ({ parts }: { parts: TotalProps[] }) => {
    return (
        <div>
            {' '}
            <p>
                Number of exercises{' '}
                {parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
            </p>{' '}
        </div>
    );
};

export default Total;
