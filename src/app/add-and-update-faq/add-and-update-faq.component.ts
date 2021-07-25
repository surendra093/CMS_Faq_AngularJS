import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { NotificationService } from '../shared/notification.service';
import { CatagoryService } from '../shared/catagory.service';
import { FaqService } from '../shared/faq.service';
import { Catagory } from '../shared/catagory.model';
import { CATAGORY } from './CATAGORY.model';
import { Faq } from '../shared/faq.model';


@Component({
  selector: 'app-add-and-update-faq',
  templateUrl: './add-and-update-faq.component.html',
  styleUrls: ['./add-and-update-faq.component.css'],
  providers:[CatagoryService,FaqService]
})


export class AddAndUpdateFaqComponent implements OnInit {

  faqForm = new FormGroup({
     _id                 : new FormControl(''),
     quesFormControl     : new FormControl('', [Validators.required]),
     ansFormControl      : new FormControl('', [Validators.required]),
     catagoryFormControl : new FormControl( 0, [Validators.required])
  })
 
  constructor(public catagoryService: CatagoryService,
    public faqService  : FaqService,
    public notificationService: NotificationService,
    public dialogRef: MatDialogRef<AddAndUpdateFaqComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Faq) { }


  catagories :  Catagory[] = [];
  catagory   :  Catagory;
  Catagories :  CATAGORY[] = [];


  ngOnInit(): void {
    
    this.getCatagories();
    //this.getCatagoryNames();
    //console.log(this.catagories);
    /*
    for(let i=0;i<this.catagories.length;i++){
      this.Catagories[i].id    = i+1;
      this.Catagories[i].value = this.catagories[i].catagoryField; 
    }*/

    this._id = this.data._id;
    this.question = this.data.question;
    this.description = this.data.description;
    for(let i=0;i < this.Catagories.length;i++){
      if(this.Catagories[i].value == this.data.catagoryName){
            this.catagoryName = (this.Catagories[i].id).toString();
            break; 
      }
    }

  }

  getCatagoryNames(){
      let i = 0; 
      for(let catagory of this.catagories){
            this.Catagories[i].id = i+1;
            this.Catagories[i].value = catagory.catagoryField;
            i++;
      }
      this.getCatagories();
  }

  faqs : Faq[] = [];
  faq  : Faq;

  _id           : string;
  question      : string;
  description   : string;
  catagoryName  : string;
  
  onClose() {
    this.dialogRef.close();
  }
  
  onReset() {
    this.faqForm.reset();
  }

  onSave(){

      if(this.faqForm.valid){
              
        if(this._id == undefined){

          const newFaq = {

                 _id           : this._id,
                 question      : this.question,
                 description   : this.description,
                 catagoryName  : this.catagoryName,
                 Date          : Date.now()
          } 

          this.faqService.addFaq(newFaq)
            .subscribe((faq:any) => {
              this.notificationService.success(':: Submitted successfully');
               this.onClose();
            },(err)=>{
                this.notificationService.warn('!Something went wrong');
            });
        }

        else{
              
          const updatedFaq = {
            _id           : this._id,
            question      : this.question,
            description   : this.description,
            catagoryName  : this.catagoryName,
          }
          
          this.faqService.updateFaq(updatedFaq)
          .subscribe(()=>{
             this.notificationService.success(':: Updated successfully');
             this.onClose();
          },(err)=>{
             this.notificationService.warn('!Something went wrong');
          });

        }

      }
  }

  private  getCatagories(){
    this.catagoryService.getCatagories()
      .subscribe((catagories:any) => 
          this.catagories = catagories)
    console.log(this.catagories);
  }

}
