export class Manager {

    id:any;
    account:string;
	password:string;
    _links: { self: { href: string } };

    constructor(id: any, account:string, password:string,links: { self: { href: string } }) {
        this.id = id;
        this.account = account;
        this.password = password;
        this._links = links;
      }
}
