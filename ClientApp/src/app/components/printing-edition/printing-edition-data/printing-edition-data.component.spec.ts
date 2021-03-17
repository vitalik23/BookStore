import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintingEditionDataComponent } from './printing-edition-data.component';

describe('PrintingEditionDataComponent', () => {
  let component: PrintingEditionDataComponent;
  let fixture: ComponentFixture<PrintingEditionDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintingEditionDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintingEditionDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
