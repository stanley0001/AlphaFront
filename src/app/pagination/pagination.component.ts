import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['../assets/css/material-dashboard.css?v=2.1.2']
})
export class PaginationComponent implements OnChanges {
  @Input()
  totalItems!: number;
  @Input() itemsPerPage: number = 10;
  @Input() currentPage: number = 1;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() itemsPerPageChange: EventEmitter<number> = new EventEmitter<number>();

  totalPages!: number;
  pages!: (number | string)[];
  
  itemsPerPageOptions = [5, 10, 25, 50, 100];

  ngOnChanges() {
    this.updatePagination();
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    this.generatePages();
  }

  generatePages() {
    const pages = [];
    const maxPagesToShow = 5;

    pages.push(1);

    if (this.currentPage > maxPagesToShow) {
      pages.push('...');
    }

    const startPage = Math.max(2, this.currentPage - 2);
    const endPage = Math.min(this.totalPages - 1, this.currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (this.currentPage < this.totalPages - maxPagesToShow + 1) {
      pages.push('...');
    }

    // Always show the last page if there is more than one page
    if (this.totalPages > 1) {
      pages.push(this.totalPages);
    }

    this.pages = pages;
  }

  goToPage(page: number | string) {
    if (page === '...' || page === this.currentPage) return;

    this.currentPage = +page;
    this.pageChange.emit(this.currentPage);
    this.generatePages();
  }

  onItemsPerPageChange() {
    this.currentPage = 1; // Reset to first page
    this.itemsPerPageChange.emit(this.itemsPerPage);
    this.updatePagination();
  }
}
