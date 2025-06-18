import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorService } from '../author.service';

@Component({
  selector: 'app-author-create',
  standalone: false,
  templateUrl: './author-create.component.html',
  styleUrl: './author-create.component.css'
})
export class AuthorCreateComponent implements OnInit {
  authorForm!: FormGroup;
  isSubmitting = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authorService: AuthorService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.authorForm = this.fb.group({
      auFname: ['', Validators.required],
      auLname: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d{3} \d{3}-\d{4}$/)]],
      address: [''],
      city: [''],
      state: [''],
      zip: [''],
      contract: [true]
    });
  }

  onSubmit(): void {
    if (this.authorForm.valid) {
      this.isSubmitting = true;
      this.errorMessage = '';

      this.authorService.createAuthor(this.authorForm.value).subscribe({
        next: (response) => {
          console.log('Author created successfully:', response);
          this.isSubmitting = false;
          // Navigate to the author detail page or back to the list
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Error creating author:', error);
          this.isSubmitting = false;
          this.errorMessage = error.message || 'Failed to create author. Please try again.';
        }
      });
    } else {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.authorForm.controls).forEach(key => {
        this.authorForm.get(key)?.markAsTouched();
      });
    }
  }

  // Helper method for template to check field validity
  isFieldInvalid(fieldName: string): boolean {
    const control = this.authorForm.get(fieldName);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  // Helper method to get field error message
getErrorMessage(fieldName: string): string {
  const control = this.authorForm.get(fieldName);

  if (!control) return '';
  if (control.errors?.['required']) return 'This field is required';
  if (control.errors?.['pattern']) {
    if (fieldName === 'phone') return 'Phone must be in format: 123 456-7890';
  }
  return 'Invalid input';
}
}