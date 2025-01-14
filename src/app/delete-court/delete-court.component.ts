import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Court } from '../model/court';
import { CourtService } from '../service/court.service';

@Component({
  selector: 'app-delete-court',
  imports: [RouterLink,NgFor,FormsModule],
  templateUrl: './delete-court.component.html',
  styleUrl: './delete-court.component.css'
})
export class DeleteCourtComponent implements OnInit{

  courts: Court[] = [];
  allCourtArea: String[] = [];

  constructor(
    private courtService: CourtService,
    private router:Router,
    private route:ActivatedRoute
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
          this.allCourtArea.push(court.area);
        })
        this.allCourtArea = Array.from(new Set(this.allCourtArea))
      }
    })
  }

  onSubmit(formData:any){
    this.courts.forEach(court=>{
      let link = court._links.self.href;
      let index = link.lastIndexOf("/");
      let id = link.substring(index+1);
      court.id = id;
      
      if(court.area == formData.courtArea){
        this.courtService.deleteCourt(court.id).subscribe({
          next:(data)=>{
            console.log(`Delete person for id = ${court.id} successfully`)
          },
          error: (error)=>{
            console.error(`Update person for id = ${court.id} fail due to`,error)
          },
          complete: ()=>{
            console.log("Delete complete")
            this.router.navigate(["all-information"])
          }
        })
      }
    })
    
  }

}
