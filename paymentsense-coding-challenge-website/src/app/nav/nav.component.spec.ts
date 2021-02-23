import { TestBed, async, ComponentFixture  } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppComponent } from '../app.component';

import { NavComponent } from './nav.component';

let component: NavComponent;
let element: HTMLElement;
let fixture: ComponentFixture<NavComponent>;

describe('NavComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
          imports: [
            RouterTestingModule,
            FontAwesomeModule
          ],
          declarations: [
            AppComponent,
            NavComponent
          ],
          providers: []
        }).compileComponents();

        fixture = TestBed.createComponent(NavComponent);
        component = fixture.debugElement.componentInstance;
        element = fixture.debugElement.nativeElement;

      }));

      it('should create the navigation Band', () => {
        fixture.detectChanges();
        expect(element.querySelector('.navbar-brand').textContent).toEqual('Paymentsense');
      });

      it('should create the navigation Home', () => {
        fixture.detectChanges();
        expect(element.querySelector('ul li').firstChild.textContent).toEqual('Home');
      });

      it('should create the navigation Countries', () => {
        fixture.detectChanges();
        expect(element.querySelector('ul li').nextSibling.textContent).toEqual('Countries');
      });
});