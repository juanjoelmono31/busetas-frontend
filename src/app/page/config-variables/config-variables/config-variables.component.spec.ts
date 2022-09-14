import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigVariablesComponent } from './config-variables.component';

describe('ConfigVariablesComponent', () => {
  let component: ConfigVariablesComponent;
  let fixture: ComponentFixture<ConfigVariablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigVariablesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigVariablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
