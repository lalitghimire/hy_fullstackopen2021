import React from 'react';
import { ContentProps } from '../type';

const Content = ({ parts }: { parts: ContentProps[] }) => {
    return (
        <div>
            {parts.map((x) => (
                <p key={x.name}>
                    {x.name} {x.exerciseCount}{' '}
                </p>
            ))}
        </div>
    );
};

export default Content;
