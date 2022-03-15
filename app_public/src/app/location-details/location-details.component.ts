import { Component, OnInit, Input } from '@angular/core';
import { Loc8rDataService } from '../loc8r-data.service';
//import { Location } from '../home-list/home-list.component';
import { Location, Review } from '../location';
import { AuthenticationService } from '../authentication.service';
import { trigger } from '@angular/animations';

@Component({
 selector: 'app-location-details',
 templateUrl: './location-details.component.html',
 styleUrls: ['./location-details.component.css']
})
export class LocationDetailsComponent implements OnInit {

 @Input() location: Location;

 public newReview = {
     author: '',
     rating: 5,
     reviewText: ''
 };

 public formVisible: boolean = false;


 public googleAPIKey: string = 'googleAPIKey';

 constructor(
     private loc8rDataService: Loc8rDataService,
     private authenticationService: AuthenticationService
) { }

 ngOnInit() {
 }

 public formError: string;
private formIsValid(): boolean {
 if (this.newReview.author && this.newReview.rating 
 && this.newReview.reviewText) {
 return true;
 } else {
 return false;
 }
}

private resetAndHideReviewForm(): void {
    this.formVisible = false;
    this.newReview.author = '';
    this.newReview.rating = 5;
    this.newReview.reviewText = '';
   }

public onReviewSubmit():void {
    this.formError = '';
    this.newReview.author = this.getUsername();
    if (this.formIsValid()) {
    console.log(this.newReview);
    this.loc8rDataService.addReviewByLocationId(this.location._id,
    this.newReview)
    .then((review: Review) => {
    console.log('Review saved', review);
    let reviews = this.location.reviews.slice(0);
    reviews.unshift(review);
    this.location.reviews = reviews;
    this.resetAndHideReviewForm();
    }) 
    } else {
    this.formError = 'All fields required, please try again';
    }
}

   public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
   }

   public getUsername(): string {
    const { name } = this.authenticationService.getCurrentUser();
    return name ? name : 'Guest';
   }
}