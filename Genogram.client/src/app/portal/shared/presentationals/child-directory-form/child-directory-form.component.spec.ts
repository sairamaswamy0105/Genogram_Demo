import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildDirectoryFormComponent } from './child-directory-form.component';

describe('ChildDirectoryFormComponent', () => {
  let component: ChildDirectoryFormComponent;
  let fixture: ComponentFixture<ChildDirectoryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChildDirectoryFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChildDirectoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
