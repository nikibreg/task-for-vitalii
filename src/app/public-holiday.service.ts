import {
  Injectable
} from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import {
  Observable, of, EMPTY
} from 'rxjs';
import {
  map, concatMap, flatMap
} from 'rxjs/operators';
import {
  IAPIResponse
} from './types/IAPIResponse';
import {
  IPublicHoliday
} from './types/IPublicHoliday';

@Injectable({
  providedIn: 'root'
})
export class PublicHolidayService {
  // private country_code: string = 'UA'
  // private year: number = 2020;
  // private API_URL: string = `https://date.nager.at/api/v2/publicholidays/${this.year}/${this.country_code}`
  private LOCAL_DATA_URL: string = '../data/public-holiday.data.json';
  private LOCAL_STORAGE_KEY: string = 'PUBLIC_HOLIDAYS'

  constructor(private httpClient: HttpClient) {}

  private initPublicHolidays(): Observable < IPublicHoliday[] > {
    return this.httpClient.get(this.LOCAL_DATA_URL, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .pipe(
        map((response: IAPIResponse[]): IPublicHoliday[] => response.map(o => {
          return {
            countryCode: o.countryCode,
            date: o.date,
            isFixed: o.fixed,
            name: o.name
          }
        }))
      )
  }

  private getPublicHolidaysFromStorage(): Observable<any> {
    let publicHolidays: IPublicHoliday[];
    const raw = localStorage.getItem(this.LOCAL_STORAGE_KEY)
    if(raw)
      publicHolidays = JSON.parse(raw)

    return of(publicHolidays)
  }

  public getPublicHolidays(): Observable <IPublicHoliday[]> {
    return this.getPublicHolidaysFromStorage()
    .pipe(
      flatMap(publicHolidaysFromStorage => {
        if(publicHolidaysFromStorage) return of(publicHolidaysFromStorage)
        return this.initPublicHolidays()
      })
    )
  }

  public setPublicHoliday(publicHolidays: IPublicHoliday[]): void{
    const raw = JSON.stringify(publicHolidays);
    localStorage.setItem(this.LOCAL_STORAGE_KEY, raw)
  }



}
