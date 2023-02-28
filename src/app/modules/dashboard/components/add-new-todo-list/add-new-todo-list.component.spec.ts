import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewTodoListComponent } from './add-new-todo-list.component';

describe('AddNewTodoListComponent', () => {
  let component: AddNewTodoListComponent;
  let fixture: ComponentFixture<AddNewTodoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewTodoListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewTodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
