export interface Diagnose {
    code: string;
    name: string;
    latin?: string;
}

export interface Entry {}

export interface PatientEntry {
    id: string;
    name: string;
    dateOfBirth: string;
    gender: string;
    ssn: string;
    occupation: string;
    entries: Entry[];
}

export enum Gender {
    Female = 'female',
    Male = 'male',
    Other = 'other',
}

export type ssnOmittedPatient = Omit<PatientEntry, 'ssn'>;
export type NewPatientEntry = Omit<PatientEntry, 'id'>;
export type PublicPatient = Omit<PatientEntry, 'ssn' | 'entries'>;
