import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {StorageService} from "@core/services/storage.service";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  breadcrumbs: { label: string, path: string }[] = [];
  dataUser = null;
  isCollapsed = false;

  constructor(private router: Router, private route: ActivatedRoute, public cookieService: CookieService) {
    this.router.events.subscribe(() => {
      this.breadcrumbs = this.router.url
        .split('/')
        .filter(segment => segment)
        .map((segment, index, segments) => ({
          label: segment.replace(/-/g, ' '),
          path: '/' + segments.slice(0, index + 1).join('/')
        }));
    });
  }

  ngOnInit(): void {
    this.dataUser = StorageService.get('USER_LOGIN');
  }

  triggerCollapse() {
    this.isCollapsed = !this.isCollapsed
  }


  navigateHome() {
    this.router.navigate(['/home/project']);
  }

  navigateAdmin() {
    this.router.navigate(['/home/admin/user']);
  }

  logout() {
    StorageService.clear();
    localStorage.clear();
    this.cookieService.delete('accessToken');
    this.cookieService.delete('refreshToken')
    this.router.navigate(['/auth/login']);
  }

  navigateResearchField() {
    this.router.navigate(['/home/admin/researchField']);
  }
}
