import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DengarPage } from './dengar.page';

describe('DengarPage', () => {
  let component: DengarPage;
  let fixture: ComponentFixture<DengarPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DengarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
