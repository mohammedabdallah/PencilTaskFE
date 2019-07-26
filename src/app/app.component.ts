import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, FormArray, NgForm, Validators } from '@angular/forms';

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
    imagePreview: string;
    productImage: any;
    constructor(private http: HttpClient) {
        this.getProducts();
    }
    ngOnInit() {
        this.productForm = new FormGroup({
            name: new FormControl(null,{ validators: [Validators.required] }),
            code: new FormControl(null,{ validators: [Validators.required] }),
            price: new FormControl(null,{ validators: [Validators.required] }),
            description: new FormControl(null,{ validators: [Validators.required] }),
            product_image: new FormControl(null,{ validators: [Validators.required] })
        });
    }
    //get all products
    getProducts() {
        return this.http.get('http://penciltask.wedev/api/v1/products').subscribe(result => {
            this.products = result.Allproducts;
        });
    }
    //create new product
    storeProduct(productForm: NgForm) {
    	// if(this.productForm.invalid)
    	// 	return;
    	const postData = new FormData();
    	postData.append('name',this.productForm.value.name);
    	postData.append('code',this.productForm.value.code);
    	postData.append('price',this.productForm.value.price);
    	postData.append('description',this.productForm.value.description);
    	postData.append("product_image", this.productImage);
    	this.http.post('http://penciltask.wedev/api/v1/products',postData).subscribe(res => {
    		 //call get products to update table
             this.getProducts();
             //reset form after insert product
             productForm.reset();
    	}, err => {
    		console.log(err);
    	});
    }
    //update product
    updateProduct(id,productForm: NgForm) {
    	this.http.put('http://penciltask.wedev/api/v1/products/' + id, this.productForm.value).subscribe(res => {
            this.getProducts();
        }, err => {
            console.log('Error occured');
        });
        this.productForm.reset();
    }
    showProduct(id) {
    	return this.http.get('http://penciltask.wedev/api/v1/products/' + id).subscribe(product => {
            this.product = product.product;
            this.productForm.patchValue({ 
                id: this.product.id,
                name: this.product.name,
                price: this.product.price,
                code: this.product.code,
                description: this.product.description,
            });
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
    //get product product_image
    onImagePicked(event: Event) {
    console.log(event);
    const file = (event.target as HTMLInputElement).files[0];
    this.productImage = file;
    this.productForm.patchValue({ product_image: file });
    this.productForm.get("product_image").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
    }
}