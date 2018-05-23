import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
  @Input() labels: string[];
  @Output() filterProductsByLabels: EventEmitter<string[]> = new EventEmitter();
  @Output() filterProductsByQuery: EventEmitter<string> = new EventEmitter();

  selectedLabels: string[] = [];
  query: string;
  constructor() { }

  ngOnInit() {
  }

  labelSelected(label) {
    if (this.selectedLabels.includes(label)) {
      _.pull(this.selectedLabels, label);
    } else {
      this.selectedLabels.push(label);
    }
    this.filterProductsByLabels.emit(this.selectedLabels);
  }
  onQueryChange() {
    console.log('on component', this.query);
    this.filterProductsByQuery.emit(this.query);
  }
}
