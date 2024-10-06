import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CookerPage } from './cooker.page';

describe('CookerPage', () => {
  let component: CookerPage;
  let fixture: ComponentFixture<CookerPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CookerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
