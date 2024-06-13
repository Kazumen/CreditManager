import {Component} from '@angular/core';
import {CreditRecord} from "../shared/models/credit-record";

const data: CreditRecord[] = [
  {date: '2020', name: 'Witold', bank: "Privat", sum: 2000, percent: 4, term: '2022'},
  {date: '2020', name: 'Witold', bank: "Privat", sum: 2000, percent: 4, term: '2022'},
  {date: '2020', name: 'Witold', bank: "Privat", sum: 2000, percent: 4, term: '2022'},
  {date: '2020', name: 'Witold', bank: "Privat", sum: 2000, percent: 4, term: '2022'},
  {date: '2020', name: 'Witold', bank: "Privat", sum: 2000, percent: 4, term: '2022'},
  {date: '2020', name: 'Witold', bank: "Privat", sum: 2000, percent: 4, term: '2022'},
  {date: '2020', name: 'Witold', bank: "Privat", sum: 2000, percent: 4, term: '2022'},
  {date: '2020', name: 'Witold', bank: "Privat", sum: 2000, percent: 4, term: '2022'}
]

@Component({
  selector: 'app-credits',
  templateUrl: './credits.component.html',
  styleUrl: './credits.component.scss'
})
export class CreditsComponent {
  displayedColumns = ['date', 'name', 'bank', 'sum', 'percent', 'term'];
  dataSource = data;
}
