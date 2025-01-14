import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Court } from '../model/court';
import { Renter } from '../model/renter';
import { TimeService } from '../service/time.service';
import { CourtService } from '../service/court.service';
import { RenterService } from '../service/renter.service';

@Component({
  selector: 'app-court-status',
  imports: [NgFor,NgIf,RouterLink],
  templateUrl: './court-status.component.html',
  styleUrl: './court-status.component.css'
})
export class CourtStatusComponent implements OnInit{
  

  courts:Court[] = [];
  renter:Renter = new Renter(undefined,"","",{self:{href:""}});
  constructor(
      private courtService: CourtService,
      private renterService: RenterService,
      private timeService: TimeService
    ){}


  ngOnInit(): void {
    this.courtService.getAllCourts().subscribe({
      next: (data)=>{
        this.courts = data._embedded.courts
      },
      error:(error)=>{
        console.error("Oops get courts error: ",error)
      },
      complete:()=>{
        this.courts.forEach(court=>{
          let link = court._links.self.href;
          let index = link.lastIndexOf("/");
          let id = link.substring(index+1);
          court.id = id;
          this.timeService.checkTimePeriods();
          if(this.timeService.morningPeriod.isPast){// isPast->  true: 代表時間已經過去了  false: 代表時間還沒到
            court.morning=false;//時間已過代表不能借  所以設為false
            court.morningRenterId = null;
          }else{
            if(court.morningRenterId!=null){
              court.morning=false;//因為更新為false的話 沒有再更新為true的話 則會一直是false
            }else{
              court.morning = true;
            }
          }

          if(this.timeService.afternoonPeriod.isPast){
            court.afternoon=false;
            court.afternoonRenterId = null;
          }else{
            if(court.afternoonRenterId!=null){
              court.afternoon=false;
            }else{
              court.afternoon=true;
            }
          }
          
          this.courtService.updateCourt(court).subscribe({
            next: (data)=>{
              console.log(`Update court for id = ${id} successfully!`)
            },
            error:(error)=>{
              console.error(`Update court for id = ${id} fail due to!`,error)
            },
            complete:()=>{
              console.log("complete")
            }
          })

        
        })

      }
    })
  }

}
