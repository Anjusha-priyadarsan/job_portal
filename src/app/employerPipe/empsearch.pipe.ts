import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'empsearch'
})
export class EmpsearchPipe implements PipeTransform {

  transform(DataArray:any[],serachString:string,searchKey:string): any {
    const result:any=[]

  if(!DataArray || !serachString || !searchKey) {

    return DataArray;

  }
  else{

    

    return DataArray.filter((item:any)=>item.companyname.trim().toLowerCase().includes(serachString.trim().toLowerCase()))

  }
  }

}
