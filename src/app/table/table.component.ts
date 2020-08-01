import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IPublicHoliday } from '../types/IPublicHoliday';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent  {
  constructor() { }
  @Input() publicHolidays: IPublicHoliday[];
  
  @Output() edit: EventEmitter<IPublicHoliday[]> = new EventEmitter();
  @Output() add: EventEmitter<IPublicHoliday[]> = new EventEmitter();
  
  editingIndex: number;
  isAdding: boolean;
  newPublicHoliday: FormGroup = new FormGroup({
    countryCode: new FormControl(),
    date: new FormControl(),
    isFixed: new FormControl(false),
    name: new FormControl()
  })

  onEdit(publicHoliday: IPublicHoliday, index: number): void{
    this.editingIndex = null;
    this.publicHolidays[index] = publicHoliday;
    console.log(this.publicHolidays, index)

    this.edit.emit(this.publicHolidays);
  }

  toggleAdding(){
    this.isAdding = true;
  }

  toggleEditing(index: number){
    console.log(index)
    this.editingIndex = index;
  }

  onAdd(): void{
    this.isAdding = false;
    const publicHoliday = this.newPublicHoliday.value;
    this.publicHolidays.push(publicHoliday)

    this.add.emit(this.publicHolidays);
    this.newPublicHoliday.reset()
  }

}
