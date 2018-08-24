export class UserModel {
    constructor(
        public id : string,
        public userId : string,
        public displayName : string,
        public email: string,
        public isBlocked : boolean,
        public isAdmin : boolean
    ) { }
}