export class Court {
    id:any;
    name:string;
	morning:boolean;
	afternoon:boolean;
	morningRenterId:any;
	afternoonRenterId:any;
	area:string;
    _links: { self: { href: string } };

    constructor(id: any, name: string, morning:boolean, afternoon:boolean,morningRenterId:any,afternoonRenterId:any,area:string,links: { self: { href: string } }) {
        this.id = id;
        this.name = name;
        this.morning = morning;
        this.afternoon = afternoon;
        this.morningRenterId = morningRenterId;
        this.afternoonRenterId = afternoonRenterId;
        this.area = area;
        this._links = links;

      }
}
