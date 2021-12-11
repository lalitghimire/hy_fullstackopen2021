import React from 'react';
import { TotalProps } from '../type';

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
