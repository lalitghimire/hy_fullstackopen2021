import React from 'react';
//import { useStateValue } from '../state';
import { Entry } from '../types';

const EntryDetails = ({ entry }: { entry: Entry }) => {
    console.log('props for entrydetails', entry);
    //const diagnosisDetail = useStateValue();
    return (
        <div>
            {entry.date} {entry.description}
            <ul>
                {entry.diagnosisCodes?.map((x) => {
                    return <li key={x}>{x}</li>;
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
