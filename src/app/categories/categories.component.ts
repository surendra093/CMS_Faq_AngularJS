import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {Catagory} from '../shared/catagory.model';
import { CatagoryService } from '../shared/catagory.service';
import {NotificationService} from '../shared/notification.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  providers: [CatagoryService]
})

export class CategoriesComponent implements OnInit {
 
  catagoryForm = new FormGroup({
     _id  : new FormControl(''),
     catagoryFormControl : new FormControl('', [Validators.required])
  })
 

  constructor(public service: CatagoryService,
     public notificationService: NotificationService) { }

  catagories: Catagory[] = [];
  catagory : Catagory;
  searchValue : string;
  p: number = 1;
  public maxSize: number = 5;

  ngOnInit(): void {
       this.getCatagories();
  }

  private  getCatagories(){
    this.service.getCatagories()
      .subscribe((catagories:any) => 
          this.catagories = catagories)
   /*
   this.service.getOpenings()
       .subscribe((opening:any) => 
           this.tempArr = opening)*/
  }

  Reset() {
    this.catagoryForm.reset();
  }
  
  initializeFromGroup(){
      this.catagoryForm.patchValue({
           catagoryField : ''
      })
  }

  
  
  _id             : string;
  catagoryField   : string;
  
  onSubmit(){

    if(this.catagoryForm.valid){

          const newCatagory =  {
               _id                : this._id,
               catagoryField      : this.catagoryField,
               Date               : Date.now()
          } 
          
          this.service.addCatagory(newCatagory)
          .subscribe((catagory:any) => {
              this.notificationService.success(':: Submitted successfully'); 
          },(err)=>{
              this.notificationService.warn('!Something went wrong');
          });
    }
          this.getCatagories();
          this.Reset();     
         
  }
 
}
