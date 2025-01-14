import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CourtComponent } from './court/court.component';
import { CourtStatusComponent } from './court-status/court-status.component';
import { AddCourtComponent } from './add-court/add-court.component';
import { DeleteCourtComponent } from './delete-court/delete-court.component';
import { RentalComponent } from './rental/rental.component';
import { RentalInformationComponent } from './rental-information/rental-information.component';
import { InquiryCourtComponent } from './inquiry-court/inquiry-court.component';
import { UpdateRentalTimeComponent } from './update-rental-time/update-rental-time.component';
import { DeleteRentalTimeComponent } from './delete-rental-time/delete-rental-time.component';
import { AllInformationComponent } from './all-information/all-information.component';

export const routes: Routes = [
    {
        path:'app-home',
        component:AppComponent
    },
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'court',
        component:CourtComponent
    },
    {
        path:'court-status',
        component:CourtStatusComponent
    },
    {
        path:'add-court',
        component:AddCourtComponent
    },
    {
        path:'delete-court',
        component:DeleteCourtComponent
    },
    {
        path:'rental/:id',
        component:RentalComponent
    },
    {
        path:'rental-information',
        component:RentalInformationComponent
    },
    {
        path:'inquiry-court',
        component:InquiryCourtComponent
    },
    {
        path:'update-rental-time/:id',
        component:UpdateRentalTimeComponent
    },
    {
        path:'delete-rental-time/:id/:time',
        component:DeleteRentalTimeComponent
    },
    {
        path:'all-information',
        component:AllInformationComponent
    },
    {
        path:'',
        redirectTo:'court',
        pathMatch:'full'
    },
];
