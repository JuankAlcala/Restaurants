import { Component, OnInit, OnDestroy } from '@angular/core';
import{ ActivatedRoute } from '@angular/router';
import{ Subscription } from 'rxjs/Rx';
import { CommentService } from './comment.service';
import { SaucerService} from '../saucers/saucer.service';


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
  providers: [CommentService, SaucerService]
})
export class CommentsComponent implements OnInit, OnDestroy {

  private saucerId:string;
  private subscription: Subscription;

  private saucer = {};
  private comments = [];
  private data = {};
  private commentSuccess:boolean = false;
  private commentError:boolean = false;  

  constructor(private route: ActivatedRoute, 
  	private commentService: CommentService,
  	private saucerService: SaucerService) { }

  ngOnInit() {
  	this.subscription = this.route.params.subscribe(
		(params: any) =>{
			this.saucerId = params.id;

			this.commentService.getComments(this.saucerId)
			.then(response => this.comments = response);

			this.saucerService.getSaucer(this.saucerId)
			.then(response => {
				console.log("REspuesta:");
				console.log(response);
				this.saucer = response
			});
		}
  		)
  }

    	sendComment(e){
    		console.log("Insertar comentario", this.data);
  		this.commentService.sendComment(this.saucerId, this.data)
  		.then(response => {
  			this.comments.push(response);
  			this.data = {};
  			this.commentSuccess = true;
  			this.commentError = false;
  		})
  		.catch( reponse => {
  			this.commentSuccess = false;
  			this.commentError = true;
  		});
  	}

  ngOnDestroy(){
  	this.subscription.unsubscribe();
  }

}
