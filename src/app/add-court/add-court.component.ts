import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CourtService } from '../service/court.service';
import { Court } from '../model/court';

@Component({
  selector: 'app-add-court',
  imports: [FormsModule,RouterLink],
  templateUrl: './add-court.component.html',
  styleUrl: './add-court.component.css'
})
export class AddCourtComponent {

  courtId:any;

  constructor(
    private courtService: CourtService,
    private router:Router,
    private route:ActivatedRoute
  ){}

  onSubmit(formData:any):void{

    let court = new Court(undefined,formData.courtName,true,true,null,null,formData.courtArea,{self:{href:""}})
      this.courtService.addCourt(court).subscribe({
        next: (data)=>{
          console.log("court created successfully!",data)
          let link = data._links.self.href;
          let index = link.lastIndexOf("/");
          let id = link.substring(index+1);
          this.courtId = id;
          
        },
        error:(error)=>{console.error("court created fail due to",error)},
        complete:()=>{
          console.log("complete court");
          this.router.navigate(['all-information']);
        }
      })
  }
}
