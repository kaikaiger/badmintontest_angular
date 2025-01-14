export class Renter {
  [x: string]: any;

    id:any;
    renterName:string;
	  phone:string;
    _links: { self: { href: string } };

    constructor(id: any, renterName:string, phone:string,links: { self: { href: string } }) {
        this.id = id;
        this.renterName = renterName;
        this.phone = phone;
        this._links = links;

      }
}
