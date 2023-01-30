export class User {
    constructor(
        public username: string, private token: string, public roles:string, public nombre:string, public destino:string, public municipalidad :string
    ) { }

    getToken() {
        return this.token;
    }
}
