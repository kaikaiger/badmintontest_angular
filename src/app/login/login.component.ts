import { Component } from '@angular/core';
import { Manager } from '../model/manager';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ManagerService } from '../service/manager.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  title = '管理員登入';
  managerId:any;
  manager:Manager = new Manager(undefined,"","",{self:{href:""}});

  constructor(
    private httpClient:HttpClient,
    private router:Router,
    private managerService:ManagerService
  ){}

  OnLogin(formData:any){

    this.managerId = 1;
    this.managerService.getManager(this.managerId).subscribe({
      next: (data)=>{
        this.manager = data;
        this.manager.id = this.managerId;
      },
      error:(error)=>{},
      complete:()=>{
        if(this.manager.account == formData.account && this.manager.password == formData.password){
          this.router.navigate(['all-information']);
        }else{
          let loginErrorConfirm = confirm("帳號密碼錯誤請重新輸入");
          this.router.navigate(['login']);
        }
      }
    })

  }

}
