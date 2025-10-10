import mongoose, { Document } from 'mongoose';
export interface IUser extends Document {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    createdAt: Date;
    updatedAt: Date;
}
declare const User: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default User;
//# sourceMappingURL=Usermodel.d.ts.map