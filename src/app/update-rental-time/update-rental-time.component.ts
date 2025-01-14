import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CourtService } from '../service/court.service';
import { Court } from '../model/court';

@Component({
  selector: 'app-update-rental-time',
  imports: [RouterLink,NgFor,FormsModule],
  templateUrl: './update-rental-time.component.html',
  styleUrl: './update-rental-time.component.css'
})
export class UpdateRentalTimeComponent implements OnInit{
  
  constructor(
        private courtService: CourtService,
        private router:Router,
        private route:ActivatedRoute,
    ){}
  
    availableTimes: String[] = [];
    courtId: any;
    court: Court = new Court(undefined,"",true,true,undefined,undefined,"",{self:{href:""}});
    renterId: any;


    ngOnInit(): void {
      
      this.courtId = this.route.snapshot.params['id'];//court id
      this.courtService.getCourt(this.courtId).subscribe({
      next: (data)=>{
        console.log(`Retrive court for id = ${this.courtId} success!`)
        this.court = data;
        this.court.id = this.courtId;
        
        this.availableTimes = [];
        
        if(this.court.morning){
          this.availableTimes.push('上午')
        }
        if(this.court.afternoon){
          this.availableTimes.push('下午')
        }
      },
      error:(error)=>{
        console.error(`Retrive court for id = ${this.courtId} fail due to`,error)
      },
      complete:()=>{
        console.log("Retrive court for id = complete")
      }
      });
    }


    onSubmit(formData: any){

      if(formData.time == "上午"){
        this.court.morning = false;
        this.court.morningRenterId = this.court.afternoonRenterId;
        this.court.afternoon = true;
        this.court.afternoonRenterId = null;
      }else if(formData.time  == '下午'){
        this.court.afternoon = false;
        this.court.afternoonRenterId = this.court.morningRenterId;
        this.court.morning = true;
        this.court.morningRenterId = null;
      }
      console.log("update-----------------------",this.court);
      this.courtService.updateCourt(this.court).subscribe({
        next:(data)=>{
          console.log(`Update court for id = ${this.courtId} successfully!`)
        },
        error:(error)=>{
          console.error(`Update court for id = ${this.courtId} fail due to`,error)
        },
        complete:()=>{
          console.log("complete");
          console.log("select time", formData.time);
          this.router.navigate(['rental-information']);
        }
      })


    }
}
