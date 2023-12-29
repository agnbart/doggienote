import { AfterViewInit, Component, ElementRef, HostListener } from '@angular/core';
import { CardComponent } from '../ui/card/card.component';
import { ButtonComponent } from '../ui/button/button.component';
import { FooterComponent } from "../ui/footer/footer.component";

@Component({
    selector: 'dg-landing-page',
    standalone: true,
    templateUrl: './landing-page.component.html',
    styleUrl: './landing-page.component.css',
    imports: [CardComponent, ButtonComponent, FooterComponent]
})
export class LandingPageComponent {
    public isActiveMobileMenu = false;
    public isActiveUserMenu = false;
    public isAuthUser = false;
    constructor() {
        
    }

    public SingInClicked() {
        this.isAuthUser = !this.isAuthUser;
    }
    public SingOutClicked() {
        this.isAuthUser = !this.isAuthUser;
    }
    
    public userMenuClicked() {
        this.isActiveUserMenu = !this.isActiveUserMenu;
    }    
    public mobileMenuClicked() {
        this.isActiveMobileMenu = !this.isActiveMobileMenu;
    }
}