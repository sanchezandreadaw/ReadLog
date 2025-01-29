import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TotalBookReadComponent } from './total-book-read.component';

describe('TotalBookReadComponent', () => {
  let component: TotalBookReadComponent;
  let fixture: ComponentFixture<TotalBookReadComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TotalBookReadComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TotalBookReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
