import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Court } from '../model/court';
import { Renter } from '../model/renter';
import { HttpClient } from '@angular/common/http';
import { CourtService } from '../service/court.service';
import { RenterService } from '../service/renter.service';

@Component({
  selector: 'app-rental',
  imports: [NgFor,FormsModule,RouterLink,ReactiveFormsModule],
  templateUrl: './rental.component.html',
  styleUrl: './rental.component.css'
})
export class RentalComponent implements OnInit{

  availableTimes: String[] = [];
  courtId: any;
  court: Court = new Court(undefined,"",true,true,undefined,undefined,"",{self:{href:""}});
  renterId: any;
  renters: Renter[] = [];

  constructor(
    private httpClient: HttpClient,
    private courtService: CourtService,
    private router:Router,
    private route:ActivatedRoute,
    private renterService: RenterService
  ){}



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

  onSubmit(formData:any){

    this.renterService.findByPhone(formData.phone).subscribe({
      next: (data)=>{
        let link = data._links.self.href;
        let index = link.lastIndexOf("/");
        let id = link.substring(index+1);
        this.renterId= id;
          //let sameConfirm = confirm("找到相同的人不新增資料表");
      },
      error:(error)=>{
        
        let renter = new Renter(undefined,formData.renterName,formData.phone,{self:{href:""}})
        this.renterService.addRenter(renter).subscribe({
          next: (data)=>{
            console.log("renter created successfully",data);
            let link = data._links.self.href;
            let index = link.lastIndexOf("/");
            let id = link.substring(index+1);
            this.renterId= id;
            
          },
          error:(error)=>{
            console.log("renter created fail due to",error);
          },
          complete:()=>{
            //console.log("add-------------------complete..."this.renterId)
            if(formData.time == "上午"){
              this.court.morning = false;
              this.court.morningRenterId = this.renterId;
            }else if(formData.time  == '下午'){
              this.court.afternoon = false;
              this.court.afternoonRenterId = this.renterId;
            }

            
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
                this.router.navigate(['court-status']);
              }
            })
            
          }

        })


      },
      complete:()=>{
        console.log("complete...");

        if(formData.time == "上午"){
          this.court.morning = false;
          this.court.morningRenterId = this.renterId;
        }else if(formData.time  == '下午'){
          this.court.afternoon = false;
          this.court.afternoonRenterId = this.renterId;
        }

        //console.log("////////////////////////////////",this.renterId)
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
            this.router.navigate(['court-status']);
          }
        })

      }
    })
  }
  

    
}
