import React from 'react';

interface ContentProps {
    name: string;
    exerciseCount: number;
}

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
