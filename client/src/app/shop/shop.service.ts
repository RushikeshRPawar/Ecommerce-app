import { HttpClient, HttpParams } from '@angular/common/http';
import { importType } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IBrand } from '../shared/models/brand';
import { IPagination } from '../shared/models/pagination';
import { IProduct } from '../shared/models/product';
import { IType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';


@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl =  environment.apiUrl;

  constructor(private http: HttpClient) {   }

  getProducts(shopParams: ShopParams): Observable<IPagination> {

    let params = new HttpParams();

    if (shopParams.brandId !== 0){
      params =  params.append('brandId', shopParams.brandId.toString());

    }
    if (shopParams.typeId !== 0){
      params = params.append('typeId', shopParams.typeId.toString());
    }

    if (shopParams.search !==  undefined && shopParams.search !== '')
    {
      params = params.append('search', shopParams.search);
    }

    params = params.append('sort', shopParams.sort);
    params = params.append('pageSize', shopParams.pageSize.toString());
    params = params.append('pageIndex', shopParams.pageNumber.toString());

    return this.http.get<IPagination>(this.baseUrl + 'products', {observe: 'response', params}).
    pipe(
      map(response => {
        return response.body;
      })
    );
  }

  getProductById(id: number): Observable<IProduct>{
    return this.http.get<IProduct>(this.baseUrl + 'products/' + id );
  }

  getBrands(): Observable<IBrand[]> {
    return this.http.get<IBrand[]>(this.baseUrl + 'products/brands');
  }

  getTypes(): Observable<IType[]> {
    return this.http.get<IType[]>(this.baseUrl + 'products/types');
  }

}
