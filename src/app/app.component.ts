import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, FormArray, NgForm } from '@angular/forms';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

@Injectable()
export class AppComponent implements OnInit {
    title = 'Pencil Task FE';
    products: any;

    constructor(private http: HttpClient) {
        this.getProducts();
    }
    //get all products
    getProducts() {
        return this.http.get('http://penciltask.wedev/api/v1/products').subscribe(products => {
            this.products = products.Allproducts;
        });
    }
    //delete products
    deleteProduct(id) {
    	if(confirm("Are you sure to delete this product")) {
    		this.http.delete('http://penciltask.wedev/api/v1/products/'+id).subscribe(res => {
    			this.getProducts();
    		});
  		}
    	
    }
    
}