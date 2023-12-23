import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPropietarioComponent } from './edit-propietario.component';

describe('EditPropietarioComponent', () => {
  let component: EditPropietarioComponent;
  let fixture: ComponentFixture<EditPropietarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditPropietarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditPropietarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
