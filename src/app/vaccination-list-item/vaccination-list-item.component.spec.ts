import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccinationListItemComponent } from './vaccination-list-item.component';

describe('VaccinationListItemComponent', () => {
  let component: VaccinationListItemComponent;
  let fixture: ComponentFixture<VaccinationListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VaccinationListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VaccinationListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
