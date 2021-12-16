import { State } from './state';
import { Diagnosis, Patient } from '../types';

export type Action =
    | {
          type: 'SET_PATIENT_LIST';
          payload: Patient[];
      }
    | {
          type: 'ADD_PATIENT';
          payload: Patient;
      }
    | {
          type: 'SET_PATIENT_DETAILS';
          payload: Patient;
      }
    | {
          type: 'SET_DIAGNOSIS_DETAILS';
          payload: Diagnosis[];
      };

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'SET_PATIENT_LIST':
            return {
                ...state,
                patients: {
                    ...action.payload.reduce(
                        (memo, patient) => ({ ...memo, [patient.id]: patient }),
                        {}
                    ),
                    ...state.patients,
                },
            };
        case 'ADD_PATIENT':
            return {
                ...state,
                patients: {
                    ...state.patients,
                    [action.payload.id]: action.payload,
                },
            };

        case 'SET_PATIENT_DETAILS':
            return {
                ...state,
                patientDetails: {
                    ...state.patientDetails,
                    [action.payload.id]: action.payload,
                },
            };
        case 'SET_DIAGNOSIS_DETAILS':
            return {
                ...state,
                diagnosisDetail: {
                    ...action.payload.reduce(
                        (memo, diagnosis) => ({
                            ...memo,
                            [diagnosis.code]: diagnosis,
                        }),
                        {}
                    ),
                    ...state.diagnosisDetail,
                },
            };

        default:
            return state;
    }
};

//action creater functions (9.18)
export const setPatientsList = (patientListFromApi: Patient[]): Action => {
    return {
        type: 'SET_PATIENT_LIST',
        payload: patientListFromApi,
    };
};

export const addNewPatient = (newPatient: Patient): Action => {
    return { type: 'ADD_PATIENT', payload: newPatient };
};

export const setPatientDetail = (patientDetailFromApi: Patient): Action => {
    return {
        type: 'SET_PATIENT_DETAILS',
        payload: patientDetailFromApi,
    };
};

export const setDiagnosisDetail = (
    diagnosisListFromApi: Diagnosis[]
): Action => {
    return {
        type: 'SET_DIAGNOSIS_DETAILS',
        payload: diagnosisListFromApi,
    };
};
