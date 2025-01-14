import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Court } from '../model/court';
import { Renter } from '../model/renter';
import { CourtService } from '../service/court.service';
import { RenterService } from '../service/renter.service';

@Component({
  selector: 'app-all-information',
  imports: [NgFor,FormsModule,RouterLink],
  templateUrl: './all-information.component.html',
  styleUrl: './all-information.component.css'
})
export class AllInformationComponent implements OnInit{

  courts: Court[] = [];
  renter:Renter = new Renter(undefined,"","",{self:{href:""}});
  rentedCourts:{courtArea:string, courtName:string, courtTime:string, renterName:string, renterPhone:string}[] = [];
  constructor(
    private courtService: CourtService,
    private renterService: RenterService
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
        console.log("///////////////////////'''''''''''''''''",this.courts);
        this.courts.forEach(court=>{
          console.log("//////////////////////////''''''''''''''''",court);
          let link = court._links.self.href;
          let index = link.lastIndexOf("/");
          let id = link.substring(index+1);
          court.id = id;
          console.log("/'/'/'/'/'/'/'/'/'/'/'/'/'/'/'/'/'/'/'/'/'/'/'/'/'/'/",id);
          if(court.morning == true){////////////mornimg aaaaa
            this.rentedCourts.push({
              courtArea:court.area,courtName:court.name,courtTime:'上午',
              renterName:'無',renterPhone:'無'})
          }else{
            if(court.morningRenterId == null){
              this.rentedCourts.push({
                courtArea:court.area,courtName:court.name,courtTime:'上午',
                renterName:'無',renterPhone:'無'})
            }else{
              this.renterService.getRenter(court.morningRenterId).subscribe({
                next: (data)=>{
                  this.renter = data;
                },
                error:(error)=>{
                  console.error("Oops get courts error: ",error)
                },
                complete:()=>{
                  this.rentedCourts.push({
                    courtArea:court.area,courtName:court.name,courtTime:'上午',
                    renterName:this.renter.renterName,renterPhone:this.renter.phone})
                }
              })
            }
          }
          if(court.afternoon == true){////////////afternoon
            this.rentedCourts.push({
              courtArea:court.area,courtName:court.name,courtTime:'下午',
              renterName:'無',renterPhone:'無'})
          }else{
            if(court.afternoonRenterId == null){
              this.rentedCourts.push({
                courtArea:court.area,courtName:court.name,courtTime:'下午',
                renterName:'無',renterPhone:'無'})
            }else{
              this.renterService.getRenter(court.afternoonRenterId).subscribe({
                next: (data)=>{
                  this.renter = data;
                },
                error:(error)=>{
                  console.error("Oops get courts error: ",error)
                },
                complete:()=>{
                  this.rentedCourts.push({
                    courtArea:court.area,courtName:court.name,courtTime:'下午',
                    renterName:this.renter.renterName,renterPhone:this.renter.phone})
                }
              })
            }
          }



        })
        console.log(this.rentedCourts);
        
      }
    })
  }
}
