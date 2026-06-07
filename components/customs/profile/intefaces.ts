export type Role = 'STUDENT' | 'ADMIN';

export type Status = 'PENDING' | 'VERIFIED' | 'IN_PROGRESS' | 'RESOLVED' | 'REJECTED';

export type Priority = 'LOW' | 'MEDIUM' | 'HIGH';

export interface ReportData {
    id: string;
    reportNumber: string;
    title: string;
    description: string;
    location: string;
    roomCode: string;
    category: string;
    imageBefore: string;
    imageAfter: string | null;
    status: Status;
    priority: Priority;
    isVerified: boolean;
    userId: string;
    adminId: string | null;
    createdAt: string; 
    updatedAt: string; 
}


export interface UserProfileData {
    id: string;
    name: string | null;
    email: string | null;
    nim_nip: string | null;
    role: Role;
    image: string | null;
    studyProgram: string | null;
    faculty:string | null;
    enrollmentYear:number | null;
    campusEmail:string | null;
    createdAt: string; 
    reports: ReportData[]; 
}

export interface StatisticData{
    total: number |null;
    selesai: number |null;
    proses: number |null;
} 