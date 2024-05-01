import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'jobappsearch'
})
export class JobappsearchPipe implements PipeTransform {
  transform(DataArray: any[], searchString: string, searchKey: string): any {
    if (!DataArray || !searchString || !searchKey) {
      return DataArray;
    } else {
      return DataArray.filter((item: any) => {
        // Check if the searchKey exists in the appliedJob property of the item and is not null or undefined
        if (item.appliedJob.hasOwnProperty(searchKey) && item.appliedJob[searchKey]) {
          // Make sure to convert both the search string and the item's property to lowercase
          return item.appliedJob[searchKey].trim().toLowerCase().includes(searchString.trim().toLowerCase());
        }
        return false; // Filter out items where the searchKey doesn't exist or is null/undefined
      });
    }
  }
  
}
