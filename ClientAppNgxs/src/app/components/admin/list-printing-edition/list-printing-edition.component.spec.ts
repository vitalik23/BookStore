import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPrintingEditionComponent } from './list-printing-edition.component';

describe('ListPrintingEditionComponent', () => {
  let component: ListPrintingEditionComponent;
  let fixture: ComponentFixture<ListPrintingEditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPrintingEditionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPrintingEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
