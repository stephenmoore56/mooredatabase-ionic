import {Observable} from "rxjs/Rx";
import "rxjs/add/operator/map";
import {Injectable} from "@angular/core";
import {Http, Response, Headers} from "@angular/http";
import {Result} from "../lib/result";

function mapResults(response: Response): Result[] {
    // The response of the API has a data
    // property with the actual results
    return response.json().data.map(r => {
        return r;
    });
}

@Injectable()
export class DataService {

    // private baseUrl: string = "http://lumen.local/api/reports";
    private baseUrl: string = "http://lumen.moore-database.com//api/reports";

    // cached query results
    private orders: Observable<Result[]>;

    constructor(private http: Http) {
    }

    public getSpeciesByMonth(): Observable<Result[]> {
        return this.getResults('speciesByMonth');
    }

    public getSpeciesByYear(): Observable<Result[]> {
        return this.getResults('speciesByYear');
    }

    public getSpeciesByOrder(): Observable<Result[]> {
        return this.getResults('speciesByOrder');
    }

    public getSpeciesByLocation(): Observable<Result[]> {
        return this.getResults('speciesByLocation');
    }

    public getSpeciesByCounty(): Observable<Result[]> {
        return this.getResults('speciesByCounty');
    }

    public getSpeciesForMonth(month: number): Observable<Result[]> {
        return this.getResults(`speciesForMonth/${month}`);
    }

    public getSpeciesForYear(year: number): Observable<Result[]> {
        return this.getResults(`speciesForYear/${year}`);
    }

    public getSpeciesAll(): Observable<Result[]> {
        return this.getResults(`speciesAll`);
    }

    public getSearchAll(searchTerm: string, orderId: number): Observable<Result[]> {
        return this.getResults(`searchAll/${searchTerm}/${orderId}`);
    }

    public getSpeciesForOrder(orderId: number): Observable<Result[]> {
        return this.getResults(`speciesForOrder/${orderId}`);
    }

    public getSpeciesForLocation(locationId: number): Observable<Result[]> {
        return this.getResults(`speciesForLocation/${locationId}`);
    }

    public getLocation(locationId: number): Observable<Result[]> {
        return this.getResults(`locationDetail/${locationId}`);
    }

    public getSpeciesDetail(speciesId: number): Observable<Result[]> {
        return this.getResults(`speciesDetail/${speciesId}`);
    }

    public getMonthsForSpecies(speciesId: number): Observable<Result[]> {
        return this.getResults(`monthsForSpecies/${speciesId}`);
    }

    public getOrdersAll(): Observable<Result[]> {
        // cache this data; used for order filter on species listings
        if (!this.orders) {
            this.orders = this.getResults(`listOrdersAll`);
        }
        return this.orders;
    }

    private getResults(endpoint: string): Observable<Result[]> {
        return this.http
            .get(`${this.baseUrl}/${endpoint}`, {headers: this.getHeaders()})
            .map(mapResults);
    }

    private getHeaders() {
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        return headers;
    }
}
