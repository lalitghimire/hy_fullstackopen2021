/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import patients from '../data/patients';
import { v4 as uuidv4 } from 'uuid';

import { PatientEntry, ssnOmittedPatient, NewPatientEntry } from '../types';

const getPatients = (): Array<ssnOmittedPatient> => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const id = uuidv4();
    const newPatientEntry = {
        id,
        ...entry,
    };
    patients.push(newPatientEntry);
    return newPatientEntry;
};

export default { getPatients, addPatient };
