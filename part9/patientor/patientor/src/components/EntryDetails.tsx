import React from 'react';
import { useStateValue } from '../state';
import { Entry } from '../types';

const EntryDetails = ({ entry }: { entry: Entry }) => {
    console.log('props for entrydetails', entry);
    const [{ diagnosisDetail }] = useStateValue();

    console.log('diagnoseis', diagnosisDetail);
    const showDetailsOfCode = (x: string) => {
        if (diagnosisDetail) {
            return diagnosisDetail[x].name;
        }
    };

    return (
        <div>
            {entry.date} {entry.description}
            <ul>
                {entry.diagnosisCodes?.map((x) => {
                    console.log('code is here', x);

                    return (
                        <li key={x}>
                            {x} {showDetailsOfCode(x)}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default EntryDetails;

{
    /* <div key={entry.id}>
    {entry.date} {entry.description}
    <ul>
        {entry.diagnosisCodes?.map((x) => {
            return (
                <li key={x}>
                    {x} {diagnosisDetail[`${x}`].name}{' '}
                </li>
            );
        })}
    </ul>
</div>; */
}
