import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePrintingEditionComponent } from './update-printing-edition.component';

describe('UpdatePrintingEditionComponent', () => {
  let component: UpdatePrintingEditionComponent;
  let fixture: ComponentFixture<UpdatePrintingEditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePrintingEditionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePrintingEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
