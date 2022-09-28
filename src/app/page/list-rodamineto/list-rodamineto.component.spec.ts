import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRodaminetoComponent } from './list-rodamineto.component';

describe('ListRodaminetoComponent', () => {
  let component: ListRodaminetoComponent;
  let fixture: ComponentFixture<ListRodaminetoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListRodaminetoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRodaminetoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
