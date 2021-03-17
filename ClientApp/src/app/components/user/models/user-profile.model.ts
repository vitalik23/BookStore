export class UserProfile{
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    passwordConfirm: string;
    currentPassword: string;
    roles: string[];
    isBlocked: boolean;
}
