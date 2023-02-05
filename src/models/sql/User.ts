import { Table, Column, Model } from "sequelize-typescript";

interface UserAttributes {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

@Table
export class User extends Model<UserAttributes> {
    @Column
    firstName: string;

    @Column
    lastName: boolean;

    @Column({ unique: true })
    email: string;

    @Column
    password: string;
}
