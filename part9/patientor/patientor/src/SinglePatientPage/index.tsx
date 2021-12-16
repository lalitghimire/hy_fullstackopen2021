import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { setPatientDetail, useStateValue, setDiagnosisDetail } from '../state';
import { Diagnosis, Patient } from '../types';

const SinglePatientPage = () => {
    const [{ patientDetails, diagnosisDetail }, dispatch] = useStateValue();
    const { id } = useParams<{ id: string }>();
    const selectedPatient: Patient = patientDetails[id];
    const [error, setError] = React.useState<string | undefined>();

    const genderIcon = (gender: string) => {
        switch (gender) {
            case 'male':
                return 'man';
            case 'female':
                return 'woman';
            case 'other':
                return 'genderless';
        }
    };

    useEffect(() => {
        //adding this line prevent from data to be
        //refetched if already in app state(check network in console)
        if (selectedPatient) {
            return;
        }
        const getSinglePatient = async () => {
            try {
                const { data: patientDetailFromApi } = await axios.get<Patient>(
                    `${apiBaseUrl}/patients/${id}`
                );
                dispatch(setPatientDetail(patientDetailFromApi));
            } catch (e) {
                console.error(e);
                setError(e.message);
            }
        };

        void getSinglePatient();
    }, [dispatch]);

    // fetch and dispatch the diagnoses list
    if (diagnosisDetail) {
        console.log(diagnosisDetail['F43.2'].name);
    }
    useEffect(() => {
        const getDiagnoses = async () => {
            try {
                const { data: diagnosisListFromApi } = await axios.get<
                    Diagnosis[]
                >(`${apiBaseUrl}/diagnoses`);
                dispatch(setDiagnosisDetail(diagnosisListFromApi));
            } catch (e) {
                console.error(e);
                setError(e.message);
            }
        };

        void getDiagnoses();
    }, [dispatch]);

    if (selectedPatient) {
        return (
            <div>
                <h2>
                    {selectedPatient.name}{' '}
                    <Icon name={genderIcon(selectedPatient.gender)}> </Icon>
                </h2>
                <p>
                    {' '}
                    ssn: {selectedPatient.ssn} <br />
                    occupation: {selectedPatient.occupation}
                </p>
                <h3>entries</h3>
                <div>
                    {selectedPatient.entries.map((entry) => {
                        return (
                            <div key={entry.id}>
                                {entry.date} {entry.description}
                                <ul>
                                    {entry.diagnosisCodes?.map((x) => {
                                        return (
                                            <li key={x}>
                                                {x}{' '}
                                                {diagnosisDetail[`${x}`].name}{' '}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    } else if (error) {
        return <div>{error}</div>;
    } else return <div>...loading</div>;
};

export default SinglePatientPage;
