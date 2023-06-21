import { Diagnosis, Medicine } from "./../../schema";

export default interface DiagnosisDAO  {
    createDiagnosis: (diagnosis: Diagnosis)=>Promise<void>;
    getDiagnosisById: (diagnosis: string)=>Promise<Diagnosis | null>;
    listPatientDiagnosis:( specializations: string[]|string, date: number, byDocotr:boolean, doctorId: string )=>Promise<Diagnosis[]>
    listDiagnosisMedicines: (diagnosisId: string) => Promise<Medicine[]>;
    getMedicine: (medicineId: string)=> Promise<Medicine>;
    updateMedicine: (medicine: Medicine)=> Promise<void>;
    deleteMedicine: (medicineId: string)=> Promise<void>;
}
