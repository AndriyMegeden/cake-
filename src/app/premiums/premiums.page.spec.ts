import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PremiumsPage } from './premiums.page';

describe('PremiumsPage', () => {
  let component: PremiumsPage;
  let fixture: ComponentFixture<PremiumsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PremiumsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
