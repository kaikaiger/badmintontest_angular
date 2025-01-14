import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Court } from '../model/court';
import { CourtService } from '../service/court.service';
import { RenterService } from '../service/renter.service';

@Component({
  selector: 'app-inquiry-court',
  imports: [RouterLink,NgFor,NgIf,FormsModule],
  templateUrl: './inquiry-court.component.html',
  styleUrl: './inquiry-court.component.css'
})
export class InquiryCourtComponent {

  courts: Court[] = [];
  
  constructor(
        private courtService: CourtService,
        private router:Router,
        private route:ActivatedRoute,
        private renterService: RenterService
  ){}

  onSearchRentalInfo(data:any){

    this.courtService.findByArea(data.area).subscribe({
      next: (data)=>{
        this.courts = data._embedded.courts;
      },
      error:(error)=>{
        console.log("can not find anyone");
      },
      complete:()=>{
        this.courts.forEach(court=>{
          let link = court._links.self.href;
          let index = link.lastIndexOf("/");
          let id = link.substring(index+1);
          court.id = id;
        })

        if(this.courts.length<=0){
          let infoConfirm = confirm("查無此場地");
        }
      }
    });

  }

}
