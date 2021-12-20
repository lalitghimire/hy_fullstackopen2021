/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import patients from '../data/patients';
import { v4 as uuidv4 } from 'uuid';

import {
    PatientEntry,
    PublicPatient,
    NewPatientEntry,
    EntryWithoutId,
} from '../types';

const getPatients = (): Array<PublicPatient> => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};

const getPatientById = (id: string): PatientEntry | undefined => {
    return patients.find((patient) => patient.id === id);
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

const addEntry = (entry: EntryWithoutId, patientId: string): PatientEntry => {
    const id = uuidv4();
    const newEntry = { id, ...entry };
    const selectedPatient = patients.find(
        (patient) => patient.id === patientId
    );
    if (selectedPatient) {
        selectedPatient.entries.push(newEntry);
        return selectedPatient;
    } else {
        throw new Error('Patient Not found');
    }
};

export default { getPatients, addPatient, getPatientById, addEntry };
