export class User {
    constructor(
        public username: string, private token: string, public roles:string[]
    ) { }

    public estaVerificado:Boolean;
    
    getToken() {
        return this.token;
    }
}
