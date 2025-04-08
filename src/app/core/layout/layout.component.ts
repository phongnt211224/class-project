import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  breadcrumbs: { label: string, path: string }[] = [];

  isCollapsed = false;

  constructor(private router: Router, private route: ActivatedRoute) {
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

  }

  triggerCollapse(){
    this.isCollapsed = !this.isCollapsed
  }

}
