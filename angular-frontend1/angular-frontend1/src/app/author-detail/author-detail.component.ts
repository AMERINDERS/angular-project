import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // Added Router import
import { AuthorService } from '../author.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-author-detail',
  standalone: false,
  templateUrl: './author-detail.component.html',
  styleUrl: './author-detail.component.css'
})
export class AuthorDetailComponent implements OnInit {
  author: any;
  editMode = false;
  authorForm: FormGroup;
  isSubmitting = false;
  errorMessage = ''; 
  constructor(
    private authorService: AuthorService,
    private route: ActivatedRoute,
    private router: Router, 
    private fb: FormBuilder,
  ) {
    this.authorForm = this.fb.group({
      au_fname: ['', Validators.required],
      au_lname: ['', Validators.required],
      phone: ['', Validators.required],
      address: [''],
      city: [''],
      state: [''],
      zip: [''],
      contract: [false]
    });
  }

  ngOnInit(): void {
    const authorId = this.route.snapshot.paramMap.get('id');
    if (authorId) {
      this.loadAuthorData(authorId);
    }
  }

  loadAuthorData(authorId: string): void {
    this.authorService.getAuthorById(authorId).subscribe((data) => {
      console.log('API RESPONSE ', data);
      this.author = data[0]; // Extract the first author from the array
      
      // Initialize the form with author data
      this.authorForm.patchValue({
        au_fname: this.author.au_fname,
        au_lname: this.author.au_lname,
        phone: this.author.phone,
        address: this.author.address,
        city: this.author.city,
        state: this.author.state,
        zip: this.author.zip,
        contract: this.author.contract
      });
    });
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }

  saveChanges(): void {
    if (this.authorForm.valid) {
      this.isSubmitting = true;
      
      // Merge the form values with the original author object to maintain any fields not in the form
      const updatedAuthor = {
        ...this.author,
        ...this.authorForm.value
      };
      
      this.authorService.updateAuthor(this.author.au_id, updatedAuthor).subscribe({
        next: (response) => {
          console.log('Author updated successfully', response);
          this.isSubmitting = false;
          this.editMode = false;
          // Refresh the author data
          this.loadAuthorData(this.author.au_id);
        },
        error: (error) => {
          console.error('Error updating author', error);
          this.isSubmitting = false;
        }
      });
    }
  }

  cancelEdit(): void {
    // Reset form to original values
    this.authorForm.patchValue({
      au_fname: this.author.au_fname,
      au_lname: this.author.au_lname,
      phone: this.author.phone,
      address: this.author.address,
      city: this.author.city,
      state: this.author.state,
      zip: this.author.zip,
      contract: this.author.contract
    });
    this.editMode = false;
  }

  deleteAuthor(authorId: string): void {
    if (confirm('Are you sure you want to delete this author? This action cannot be undone.')) {
      this.isSubmitting = true;
      this.errorMessage = '';
      
      this.authorService.deleteAuthor(authorId).subscribe({
        next: () => {
          console.log('Author deleted successfully');
          this.isSubmitting = false;
          // Navigate back to the authors list
          this.router.navigate(['/authors']);
        },
        error: (error) => {
          console.error('Error deleting author:', error);
          this.isSubmitting = false;
          this.errorMessage = error.message || 'Failed to delete author. Please try again.';
        }
      });
    }
  }
}