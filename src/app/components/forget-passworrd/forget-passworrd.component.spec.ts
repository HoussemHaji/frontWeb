import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetPassworrdComponent } from './forget-passworrd.component';

describe('ForgetPassworrdComponent', () => {
  let component: ForgetPassworrdComponent;
  let fixture: ComponentFixture<ForgetPassworrdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ForgetPassworrdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ForgetPassworrdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
