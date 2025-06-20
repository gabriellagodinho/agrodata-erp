import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { NgFor, NgIf, SlicePipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface TableColumn {
  key: string;
  header: string;
  sortable?: boolean;
  type?: 'text' | 'number' | 'date' | 'status' | 'actions';
  width?: string;
  formatter?: (value: any, row: any) => string;
}

export interface TableAction {
  label: string;
  icon: string;
  action: (item: any) => void;
  color?: string;
  showCondition?: (item: any) => boolean;
}

export interface TablePagination {
  pageSize: number;
  currentPage: number;
  totalItems: number;
}

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [NgFor, NgIf, CommonModule, FormsModule],
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {
  @Input() columns: TableColumn[] = [];
  @Input() data: any[] = [];
  @Input() actions: TableAction[] = [];
  @Input() showSearch = true;
  @Input() showPagination = true;
  @Input() emptyStateMessage = 'Nenhum dado encontrado';
  @Input() loading = false;
  @Input() selectable = false;

  // Make Math available to the template
  protected Math = Math;

  @Output() rowClick = new EventEmitter<any>();
  @Output() rowSelect = new EventEmitter<any[]>();
  @Output() pageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();

  // Pagination
  pagination: TablePagination = {
    pageSize: 10,
    currentPage: 1,
    totalItems: 0
  };
  pageSizeOptions = [5, 10, 25, 50, 100];

  // Sorting
  sortColumn: string | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';

  // Filtering
  searchTerm = '';
  filteredData: any[] = [];

  // Selection
  selectedItems: any[] = [];
  selectAll = false;

  ngOnInit(): void {
    this.updateFilteredData();
  }

  /**
   * Update filtered data based on search term and sorting
   */
  updateFilteredData(): void {
    // Apply search filter
    let filtered = this.data;
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = this.data.filter(item => {
        return Object.keys(item).some(key => {
          const value = item[key];
          if (value === null || value === undefined) return false;
          return value.toString().toLowerCase().includes(term);
        });
      });
    }

    // Apply sorting
    if (this.sortColumn) {
      filtered = [...filtered].sort((a, b) => {
        const aValue = a[this.sortColumn!];
        const bValue = b[this.sortColumn!];

        if (aValue === bValue) return 0;

        const comparison = aValue < bValue ? -1 : 1;
        return this.sortDirection === 'asc' ? comparison : -comparison;
      });
    }

    this.filteredData = filtered;
    this.pagination.totalItems = filtered.length;
    this.updateSelectedItems();
  }

  /**
   * Sort data by column
   */
  sort(column: TableColumn): void {
    if (!column.sortable) return;

    if (this.sortColumn === column.key) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column.key;
      this.sortDirection = 'asc';
    }

    this.updateFilteredData();
  }

  /**
   * Get current page data
   */
  get paginatedData(): any[] {
    if (!this.showPagination) return this.filteredData;

    const startIndex = (this.pagination.currentPage - 1) * this.pagination.pageSize;
    return this.filteredData.slice(startIndex, startIndex + this.pagination.pageSize);
  }

  /**
   * Change page
   */
  onPageChange(page: number): void {
    this.pagination.currentPage = page;
    this.pageChange.emit(page);
  }

  /**
   * Change page size
   */
  onPageSizeChange(): void {
    this.pagination.currentPage = 1;
    this.pageSizeChange.emit(this.pagination.pageSize);
  }

  /**
   * Handle row click
   */
  onRowClick(item: any): void {
    this.rowClick.emit(item);
  }

  /**
   * Toggle item selection
   */
  toggleSelection(item: any): void {
    const index = this.selectedItems.findIndex(i => i === item);
    if (index === -1) {
      this.selectedItems.push(item);
    } else {
      this.selectedItems.splice(index, 1);
    }
    this.updateSelectAllState();
    this.rowSelect.emit(this.selectedItems);
  }

  /**
   * Toggle select all
   */
  toggleSelectAll(): void {
    if (this.selectAll) {
      this.selectedItems = [...this.paginatedData];
    } else {
      this.selectedItems = [];
    }
    this.rowSelect.emit(this.selectedItems);
  }

  /**
   * Update selected items when data changes
   */
  private updateSelectedItems(): void {
    // Remove items that are no longer in the filtered data
    this.selectedItems = this.selectedItems.filter(item =>
      this.filteredData.includes(item)
    );
    this.updateSelectAllState();
  }

  /**
   * Update select all state
   */
  private updateSelectAllState(): void {
    this.selectAll = this.paginatedData.length > 0 &&
      this.paginatedData.every(item => this.selectedItems.includes(item));
  }

  /**
   * Check if an item is selected
   */
  isSelected(item: any): boolean {
    return this.selectedItems.includes(item);
  }

  /**
   * Get total pages
   */
  get totalPages(): number {
    return Math.ceil(this.pagination.totalItems / this.pagination.pageSize);
  }

  /**
   * Get page numbers to display
   */
  get pageNumbers(): number[] {
    const totalPages = this.totalPages;
    const currentPage = this.pagination.currentPage;

    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, -1, totalPages];
    }

    if (currentPage >= totalPages - 3) {
      return [1, -1, totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }

    return [1, -1, currentPage - 1, currentPage, currentPage + 1, -1, totalPages];
  }
}
