import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit, OnChanges {
  pages=[];
  currentPageSize:number=1;
  totalPages:number=1;
  @Input() pageSizes = [];
  @Input() currentPage = 1;
  @Input() dataSize = 1;
  @Output() onPageChanged = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
    this.resetPages();
  }

  ngOnChanges(): void {
    this.resetPages();
  }

  pageChanged(page:number){
    this.currentPage = page;
    this.onPageChanged.emit(page);
  }

  resetPages(){
    this.pages=[];
    for(let i=1;i<this.dataSize/this.currentPageSize+1;i++){ this.pages.push(i) }
    this.currentPage = 1;
    this.onPageChanged.emit()
  }

  pageSizeChanged(pageSize:number){
    this.currentPageSize = pageSize;
    this.resetPages();
  }

}
