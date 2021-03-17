import { UserProfile } from 'src/app/components/user/models/user-profile.model';

export interface UpdateState{
    updateUserModel: UserProfile;
}

export const initialUpdateState: UpdateState = {
    updateUserModel: null,
};
