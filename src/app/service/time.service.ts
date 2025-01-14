import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  constructor() { }

  morningPeriod = {start:'9:30', end:'24:00', isPast: false}//11
  afternoonPeriod = {start:'13:00', end:'24:00', isPast: false}//17

  checkTimePeriods():void{
    const now = new Date();
    const currentHours = now.getHours();
    const currentMinute = now.getMinutes();

    this.morningPeriod.isPast = this.isTimePeriodPast(this.morningPeriod.start,this.morningPeriod.end,currentHours,currentMinute);
    this.afternoonPeriod.isPast = this.isTimePeriodPast(this.afternoonPeriod.start,this.afternoonPeriod.end,currentHours,currentMinute)
  }

  isTimePeriodPast(startTime:string,endTime:string,currentHours:number,currentMinute:number):boolean{
    const [startHours,startMinutes]=startTime.split(':').map(Number);
    const [endHours,endMinutes]=endTime.split(':').map(Number);
    if(currentHours>endHours || (currentHours===endHours && currentMinute>endMinutes)){
      return true;
    }
    return false;
  }

}
