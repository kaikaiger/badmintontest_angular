import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { RenterService } from '../service/renter.service';
import { CourtService } from '../service/court.service';
import { Court } from '../model/court';
import { Renter } from '../model/renter';

@Component({
  selector: 'app-rental-information',
  imports: [RouterLink,NgFor,NgIf,FormsModule],
  templateUrl: './rental-information.component.html',
  styleUrl: './rental-information.component.css'
})
export class RentalInformationComponent {

  allCourts: Court[] = [];
  renter:Renter = new Renter(undefined,"","",{self:{href:""}});
  rentedCourts:{courtArea:string, courtName:string, courtTime:string, renterName:string, renterPhone:string, courtId:any}[] = [];
  renterId:any;
    
  constructor(
      private courtService: CourtService,
      private router:Router,
      private route:ActivatedRoute,
      private renterService: RenterService
  ){}

  onSearchRentalInfo(formData:any){

    this.renterService.findByPhone(formData.phone).subscribe({
      next: (data)=>{
        let link = data._links.self.href;
        let index = link.lastIndexOf("/");
        let id = link.substring(index+1);
        this.renterId= id;
        this.renter = new Renter(this.renterId, data.renterName, data.phone, data._links);
        console.log("===========================================",this.renter);
        console.log("===========================================",data);
        console.log("===========================================");

      },
      error:(error)=>{
        let searchConfirm = confirm("查無資料");
      },
      complete:()=>{
        this.courtService.getAllCourts().subscribe({

          next: (data)=>{
            this.allCourts = data._embedded.courts
          },
          error:(error)=>{
            console.error("Oops get courts error: ",error)
          },
          complete:()=>{

            this.allCourts.forEach(court=>{
            console.log("//////////////////////////''''''''''''''''",court);
            let link = court._links.self.href;
            let index = link.lastIndexOf("/");
            let id = link.substring(index+1);
            court.id = id;
            console.log("/'/'/'/'/'/'/'/'/'/'/'/'/'/'/'/'/'/'/'/'/'/'/'/'/'/'/",id);
            if(court.morningRenterId == this.renterId){////////////mornimg aaaaa
              this.rentedCourts.push({
                courtArea:court.area,courtName:court.name,courtTime:'上午',
                renterName:this.renter.renterName,renterPhone:this.renter.phone,courtId:court.id})
            }
            
            if(court.afternoonRenterId == this.renterId){////////////afternoon
              this.rentedCourts.push({
                courtArea:court.area,courtName:court.name,courtTime:'下午',
                renterName:this.renter.renterName,renterPhone:this.renter.phone,courtId:court.id})
            }
          
            })

          }
        });



          
        
      }
    });

  }
}
