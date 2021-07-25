import { Catagory } from './shared/catagory.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchfilter'
})
export class SearchfilterPipe implements PipeTransform {

  transform(catagories:Catagory[],searchValue: string): Catagory[] {
       if(!catagories || !searchValue){
           return catagories;
       }
      
       return catagories.filter(catagory =>
        catagory.catagoryField.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()));
  }

}
