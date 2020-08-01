import { Component, OnInit } from '@angular/core';
import { PublicHolidayService } from './public-holiday.service';
import { IPublicHoliday } from './types/IPublicHoliday';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  publicHolidays: IPublicHoliday[];

  constructor(private publicHolidaysService: PublicHolidayService){}

  ngOnInit(){
   this.publicHolidaysService.getPublicHolidays()
   .pipe(
     map((publicHolidays:IPublicHoliday[]) => {
       this.publicHolidays = publicHolidays
       console.log(this.publicHolidays)
     })
   )
   .subscribe()
  }

  onAdd(publicHolidays: IPublicHoliday[]){
    this.publicHolidaysService.setPublicHoliday(publicHolidays)
  }

  onEdit(publicHolidays: IPublicHoliday[]){
    this.publicHolidaysService.setPublicHoliday(publicHolidays)
  }
}
