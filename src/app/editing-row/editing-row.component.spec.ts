import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditingRowComponent } from './editing-row.component';

describe('EditingRowComponent', () => {
  let component: EditingRowComponent;
  let fixture: ComponentFixture<EditingRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditingRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditingRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
