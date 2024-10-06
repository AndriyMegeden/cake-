import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrationDetailsPage } from './registration-details.page';

describe('RegistrationDetailsPage', () => {
  let component: RegistrationDetailsPage;
  let fixture: ComponentFixture<RegistrationDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RegistrationDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
