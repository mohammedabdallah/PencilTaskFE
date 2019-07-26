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
    private productForm: FormGroup;
    products: any;

    constructor(private http: HttpClient) {
        this.getProducts();
    }
    ngOnInit() {
        this.productForm = new FormGroup({
            'name': new FormControl(),
            'code': new FormControl(),
            'price': new FormControl(),
            'description': new FormControl()
        });
    }
    //get all products
    getProducts() {
        return this.http.get('http://penciltask.wedev/api/v1/products').subscribe(products => {
            this.products = products.Allproducts;
        });
    }
    storeProduct(productForm: NgForm) {
    	this.http.post('http://penciltask.wedev/api/v1/products',productForm.value).subscribe(res => {
    		 //call get products to update table
             this.getProducts();
             //reset form after insert product
             productForm.reset();
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