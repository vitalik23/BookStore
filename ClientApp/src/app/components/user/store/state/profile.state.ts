import { UserProfile } from '../../models/user-profile.model';

export interface UserProfileState{
    profileModel?: UserProfile;
}

export const initialProfileState: UserProfileState = {
    profileModel: null
};
