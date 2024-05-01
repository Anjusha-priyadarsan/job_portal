import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'usersearch'
})
export class UsersearchPipe implements PipeTransform {

  transform(DataArray:any[],serachString:string,searchKey:string): any {
    const result:any=[]

  if(!DataArray || !serachString || !searchKey) {

    return DataArray;

  }
  else{

    

    return DataArray.filter((item:any)=>item.username.trim().toLowerCase().includes(serachString.trim().toLowerCase()))

  }
  }

}
