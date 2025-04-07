import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prj-index',
  templateUrl: './prj-index.component.html',
  styleUrls: ['./prj-index.component.scss']
})
export class PrjIndexComponent implements OnInit {
  projects = [];

  constructor() { }

  ngOnInit(): void {
    this.projects = [
      {
        id: 1,
        title: 'Project A',
        description: 'This is a description for project A.',
        image: 'https://via.placeholder.com/150', // Use a placeholder image
        status: 'In Progress',
        startDate: '2024-01-01',
        endDate: '2024-12-31'
      },
      {
        id: 2,
        title: 'Project B',
        description: 'This is a description for project B.',
        image: 'https://via.placeholder.com/150',
        status: 'Completed',
        startDate: '2023-01-01',
        endDate: '2023-12-31'
      },
      {
        id: 3,
        title: 'Project C',
        description: 'This is a description for project C.',
        image: 'https://via.placeholder.com/150',
        status: 'Pending',
        startDate: '2025-01-01',
        endDate: '2025-12-31'
      }
    ];
  }

}
