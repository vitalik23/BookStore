import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsOrderComponent } from './client-orders.component';

describe('ClientsOrderComponent', () => {
  let component: ClientsOrderComponent;
  let fixture: ComponentFixture<ClientsOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientsOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
