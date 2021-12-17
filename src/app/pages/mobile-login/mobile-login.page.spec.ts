import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MobileLoginPage } from './mobile-login.page';

describe('MobileLoginPage', () => {
  let component: MobileLoginPage;
  let fixture: ComponentFixture<MobileLoginPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileLoginPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MobileLoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
