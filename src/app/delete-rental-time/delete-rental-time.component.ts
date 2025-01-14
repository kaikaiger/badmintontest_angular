import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CourtService } from '../service/court.service';
import { RenterService } from '../service/renter.service';
import { Court } from '../model/court';

@Component({
  selector: 'app-delete-rental-time',
  imports: [RouterOutlet,RouterLink,RouterLinkActive],
  templateUrl: './delete-rental-time.component.html',
  styleUrl: './delete-rental-time.component.css'
})
export class DeleteRentalTimeComponent implements OnInit{

  constructor(
      private courtService: CourtService,
      private router:Router,
      private route:ActivatedRoute,
      private renterService: RenterService
  ){}

  availableTimes: String[] = [];
  courtId: any;
  courtTime: string= '';
  court: Court = new Court(undefined,"",true,true,undefined,undefined,"",{self:{href:""}});
  renterId: any;


  ngOnInit(): void {
    
    let deleteConfirm = confirm("確定取消");

    if(deleteConfirm){

      this.courtId = this.route.snapshot.params['id'];
      this.courtTime = this.route.snapshot.params['time'];
      this.courtService.getCourt(this.courtId).subscribe({
        next: (data)=>{
          console.log(`Retrive court for id = ${this.courtId} success!`)
          this.court = data;
          this.court.id = this.courtId;
        },
        error:(error)=>{
          console.error(`Retrive court for id = ${this.courtId} fail due to`,error)
        },
        complete:()=>{
          console.log("Retrive court for id = complete")
          if(this.courtTime == '上午'){
            this.court.morning = true;
            this.court.morningRenterId = null;
          }
          if(this.courtTime == '下午'){
            this.court.afternoon = true;
            this.court.afternoonRenterId = null;
          }

          this.courtService.updateCourt(this.court).subscribe({
            next: (data)=>{
              console.log(`Update court for id = ${this.courtId} successfully!`)
            },
            error:(error)=>{
              console.error(`Update court for id = ${this.courtId} fail due to`,error)
            },
            complete:()=>{
              console.log("complete");
              this.router.navigate(['rental-information']);
            }
          });

        }

      });
    }else{
      this.router.navigate(['rental-information']);
    }
  }

}
