import { Component, signal } from '@angular/core';
import { BtnPrimaryComponent } from "../btn-primary/btn-primary.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NewsletterserviceService } from '../../services/newsletterservice.service';

@Component({
  selector: 'app-newsletter-form',
  imports: [
    BtnPrimaryComponent,
    BtnPrimaryComponent,
    ReactiveFormsModule
  ],
  providers: [NewsletterserviceService],
  templateUrl: './newsletter-form.component.html',
  styleUrl: './newsletter-form.component.scss'
})
export class NewsletterFormComponent {
  newsLetterforms!: FormGroup;
  loading = signal(false);

  constructor(private service: NewsletterserviceService) {
    this.newsLetterforms = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

 onSubmit() {
    if (this.newsLetterforms.valid) {
      this.service.sendData(this.newsLetterforms.value.name,
        this.newsLetterforms.value.email).subscribe({
          complete: () => {
            this.newsLetterforms.reset();
          }
        })
    }
  }
}

