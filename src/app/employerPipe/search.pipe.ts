import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(DataArray:any[],serachString:string,searchKey:string): any {
    if (!DataArray || !serachString || !searchKey) {
      return DataArray;
    } else {
      return DataArray.filter((item: any) => {
        // Check if the searchKey exists in the item and is not null or undefined
        if (item.hasOwnProperty(searchKey) && item[searchKey]) {
          // Make sure to convert both the search string and the item's property to lowercase
          return item[searchKey].trim().toLowerCase().includes(serachString.trim().toLowerCase());
        }
        return false; // Filter out items where the searchKey doesn't exist or is null/undefined
      });
    }
  }
  }



