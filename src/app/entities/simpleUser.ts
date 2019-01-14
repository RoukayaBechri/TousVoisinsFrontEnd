import { Adresse } from './adresse';

export class SimpleUser {
    id: number;
    userName : string ="";
    userLastName: string="";
    userType: string= "";
    userRank;
    userDescription :string="";
    userAdresse: Adresse;
    userEmail: string="";
    userPassword: string="";
    userPhone: number=0;
    userGender: string="";
    userBirthDate: Date;
    userPhoto: string ;

}