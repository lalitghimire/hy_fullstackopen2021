import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { useStateValue } from '../state';
import { Patient } from '../types';

const SinglePatientPage = () => {
    const [{ patientDetails }, dispatch] = useStateValue();
    const { id } = useParams<{ id: string }>();
    const selectedPatient: Patient = patientDetails[id];

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
                const { data: patientDetailApi } = await axios.get<Patient>(
                    `${apiBaseUrl}/patients/${id}`
                );
                dispatch({
                    type: 'SET_PATIENT_DETAILS',
                    payload: patientDetailApi,
                });
            } catch (e) {
                console.error(e);
            }
        };
        void getSinglePatient();
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
            </div>
        );
    } else return <div>...loading</div>;
};

export default SinglePatientPage;
