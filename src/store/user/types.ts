

export interface User {
    displayName: string | null,
    uid: string,
    photoURL: string | null,
    email: string | null 
}

export interface State{
    currentUser: User | null
}