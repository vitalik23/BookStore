import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPrintingEditionComponent } from './add-printing-edition.component';

describe('AddPrintingEditionComponent', () => {
  let component: AddPrintingEditionComponent;
  let fixture: ComponentFixture<AddPrintingEditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPrintingEditionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPrintingEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
