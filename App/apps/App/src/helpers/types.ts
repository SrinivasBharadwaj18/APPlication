export type CreatUserForm  = {
    username: string
    firstname: string
    lastname: string
    emailid: string
    password:string
    age:string
}

export type Form = Omit<CreatUserForm ,'password'>

export type User = {
    _id:string,
    username:string,
    emailid:string,
    firstname:string,
    lastname:string,
    role:string
    age:string
}