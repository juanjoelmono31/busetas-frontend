import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCoductoresComponent } from './list-coductores.component';

describe('ListCoductoresComponent', () => {
  let component: ListCoductoresComponent;
  let fixture: ComponentFixture<ListCoductoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCoductoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCoductoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
