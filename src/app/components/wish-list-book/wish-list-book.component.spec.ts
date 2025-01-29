import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WishListBookComponent } from './wish-list-book.component';

describe('WishListBookComponent', () => {
  let component: WishListBookComponent;
  let fixture: ComponentFixture<WishListBookComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [WishListBookComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WishListBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
