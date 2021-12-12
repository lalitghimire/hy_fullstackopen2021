import React from 'react';
import { CoursePart } from '../type';
import Part from './Part';

const Content = ({ parts }: { parts: CoursePart[] }) => {
    return (
        <div>
            {parts.map((x) => (
                <Part key={x.name} part={x} />
            ))}
        </div>
    );
};

export default Content;
