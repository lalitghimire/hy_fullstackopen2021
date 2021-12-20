import React from 'react';
import { useStateValue } from '../state';
import {
    Entry,
    HealthCheckEntry,
    HospitalEntry,
    OccupationalHealthcareEntry,
} from '../types';
import { Icon, Card } from 'semantic-ui-react';

// Hospital entry
const HospitalEntryDetails = ({ entry }: { entry: HospitalEntry }) => {
    const [{ diagnosisDetail }] = useStateValue();

    const showDetailsOfCode = (x: string) => {
        if (diagnosisDetail) {
            return diagnosisDetail[x].name;
        }
    };

    return (
        <div>
            <Card fluid style={{ marginBottom: '10px' }}>
                <Card.Content>
                    <Card.Header>
                        {entry.date} <Icon name='hospital'></Icon>
                    </Card.Header>
                    <Card.Meta>{entry.description}</Card.Meta>

                    <Card.Description>
                        <ul>
                            {entry.diagnosisCodes?.map((x) => {
                                return (
                                    <li key={x}>
                                        {x} {showDetailsOfCode(x)}
                                    </li>
                                );
                            })}
                        </ul>
                    </Card.Description>
                </Card.Content>
            </Card>
        </div>
    );
};

// ocupationalHealthCareEntry
const OccupationalHealthcareEntryDetails = ({
    entry,
}: {
    entry: OccupationalHealthcareEntry;
}) => {
    const [{ diagnosisDetail }] = useStateValue();

    const showDetailsOfCode = (x: string) => {
        if (diagnosisDetail) {
            return diagnosisDetail[x].name;
        }
    };

    return (
        <div>
            <Card fluid style={{ marginBottom: '5px' }}>
                <Card.Content>
                    <Card.Header>
                        {entry.date} <Icon name='stethoscope'></Icon>{' '}
                        {entry.employerName}
                    </Card.Header>
                    <Card.Meta>{entry.description}</Card.Meta>

                    <Card.Description>
                        <ul>
                            {entry.diagnosisCodes?.map((x) => {
                                return (
                                    <li key={x}>
                                        {x} {showDetailsOfCode(x)}
                                    </li>
                                );
                            })}
                        </ul>
                    </Card.Description>
                </Card.Content>
            </Card>
        </div>
    );
};

// HealthCheck Entry
const HealthCheckEntryDetails = ({ entry }: { entry: HealthCheckEntry }) => {
    const [{ diagnosisDetail }] = useStateValue();

    // choose color of heart icon according rating type
    const heartIconColor = (rating: number) => {
        switch (rating) {
            case 0:
                return 'green';
            case 1:
                return 'yellow';
            case 2:
                return 'orange';
            case 3:
                return 'red';

            default:
                return 'blue';
        }
    };

    const showDetailsOfCode = (x: string) => {
        if (diagnosisDetail) {
            return diagnosisDetail[x].name;
        }
    };

    return (
        <div>
            <Card fluid style={{ marginBottom: '10px' }}>
                <Card.Content>
                    <Card.Header>
                        {entry.date} <Icon name='doctor'></Icon>{' '}
                    </Card.Header>
                    <Card.Meta>{entry.description}</Card.Meta>

                    <Card.Description>
                        <ul>
                            {entry.diagnosisCodes?.map((x) => {
                                return (
                                    <li key={x}>
                                        {x} {showDetailsOfCode(x)}
                                    </li>
                                );
                            })}
                        </ul>
                        <Icon
                            name='heart'
                            size='big'
                            color={heartIconColor(entry.healthCheckRating)}
                        />
                    </Card.Description>
                </Card.Content>
            </Card>
        </div>
    );
};

// const EntryDetails = ({ entry }: { entry: Entry }) => {
//     console.log('props for entrydetails', entry);
//     const [{ diagnosisDetail }] = useStateValue();

//     console.log('diagnoseis', diagnosisDetail);
//     const showDetailsOfCode = (x: string) => {
//         if (diagnosisDetail) {
//             return diagnosisDetail[x].name;
//         }
//     };

//     return (
//         <div>
//             {entry.date} {entry.description}
//             <ul>
//                 {entry.diagnosisCodes?.map((x) => {
//                     console.log('code is here', x);

//                     return (
//                         <li key={x}>
//                             {x} {showDetailsOfCode(x)}
//                         </li>
//                     );
//                 })}
//             </ul>
//         </div>
//     );
// };

const EntryDetails = ({ entry }: { entry: Entry }) => {
    switch (entry.type) {
        case 'Hospital':
            return <HospitalEntryDetails entry={entry} />;
        case 'OccupationalHealthcare':
            return <OccupationalHealthcareEntryDetails entry={entry} />;
        case 'HealthCheck':
            return <HealthCheckEntryDetails entry={entry} />;
    }
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
