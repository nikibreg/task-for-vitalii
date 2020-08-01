import { Component, OnInit, Input, EventEmitter, SimpleChanges, OnChanges, Output } from '@angular/core';
import { IPublicHoliday } from '../types/IPublicHoliday';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: '[editing-row]',
  templateUrl: './editing-row.component.html',
  styleUrls: ['./editing-row.component.scss']
})
export class EditingRowComponent implements OnChanges {
  @Input() publicHoliday: IPublicHoliday;
  @Output() edit: EventEmitter<IPublicHoliday> = new EventEmitter();
  constructor() { }

  editingPublicHoliday: FormGroup;

  ngOnChanges(changes: SimpleChanges): void {
    this.editingPublicHoliday = new FormGroup({
      countryCode: new FormControl(this.publicHoliday.countryCode),
      date: new FormControl(this.publicHoliday.date),
      isFixed: new FormControl(this.publicHoliday.isFixed),
      name: new FormControl(this.publicHoliday.name)
    })
  }

  onEdit(){
    this.edit.emit(this.editingPublicHoliday.value);
  }

}
