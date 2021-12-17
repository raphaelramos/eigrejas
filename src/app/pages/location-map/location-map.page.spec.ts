import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LocationMapPage } from './location-map.page';

describe('LocationMapPage', () => {
  let component: LocationMapPage;
  let fixture: ComponentFixture<LocationMapPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationMapPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LocationMapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
