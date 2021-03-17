import { UserProfile } from '../../../user/models/user-profile.model';

export interface ListClientState{
    data: UserProfile[];
    pageNumber: number;
    pageSize: number;
    totalItems: number;
}

export const initialClientState: ListClientState = {
    pageNumber: 1,
    pageSize: 5,
    totalItems: null,
    data: null
};
