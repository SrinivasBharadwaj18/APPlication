type Credentails = {
    _id:string,
    username: string
    firstname: string
    lastname: string
    emailid: string
    password:string
    age:string
    role:string
}

export type ChatType = {type:string, message:string, time: string}

export type CreatUserForm  = Omit<Credentails, 'age'|'_id'|'role'>

export type Form = Omit<Credentails ,'password'|'_id'|'role'>

export type User = Omit<Credentails,'password'>
