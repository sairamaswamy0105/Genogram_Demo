  export  interface UserModel
        {
            id:number,
            name:string,
            street:string,
            city:string,
            pincode:string,
            nationality:string,
            language:string,
            email:string,
            dateOfBirth:string,
            userImage:string,
            userRelations?:UserRelationalModel[]
        }
export interface UserRelationalModel{
  id:Number,
  firstName:string,
  lastName:string,
  relationship:string,
  phone:string,
  email:string,
  primaryContact:boolean,
  userId:number
}