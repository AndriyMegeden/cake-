import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReceptPage } from './recept.page';

describe('ReceptPage', () => {
  let component: ReceptPage;
  let fixture: ComponentFixture<ReceptPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ReceptPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
