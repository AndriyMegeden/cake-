import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutappPage } from './aboutapp.page';

describe('AboutappPage', () => {
  let component: AboutappPage;
  let fixture: ComponentFixture<AboutappPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AboutappPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
