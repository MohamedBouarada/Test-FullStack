import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../service/application.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  formIsValid: boolean;
  email: string ='';
  username: string='';
  password: string='';
  errorMessage: string;

  constructor(
    private applicationService: ApplicationService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  // TODO gérer les contraintes du formulaire
  // L'email doit être valide (à priori)
  // Le username doit être rempli
  // Le mot de passe doit :
  // - faire au moins 8 caractères
  // - contenir une ou plusieurs lettres majuscules,
  // - contenir un ou plusieurs chiffres
  // - contenir un ou plusieurs caractères spéciaux (caractère qui ne soit ni
  //   un chiffre ni une lettre de l'alphabet majuscule ou minuscule)
  onInputUpdate(value: string, field: string): void {
    this[field] = value;
    this.validateForm();
  }

  isEmailValid(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !this.email || this.email.match(emailRegex) !== null;
  }

  isUsernameValid(): boolean {
    return !this.username || this.username.length > 0;
  }

  isPasswordValid(): boolean {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return !this.password || this.password.match(passwordRegex) !== null;
  }

  validateForm(): void {
    this.formIsValid = false;

    if (
      this.isEmailValid() &&
      this.isUsernameValid() &&
      this.isPasswordValid() && this.email.length> 0 && this.password.length>0 && this.username.length>0
    ) {
      this.formIsValid = true; 
    }
  }

  onSubmit(): void {
    // TODO Gérer les échecs d'inscription
    // Losqu'un utilisateur existe déjà, cette requête ne devrait pas fonctionner,
    // Il faut donc afficher le bon message d'erreur avec une alerte via `Swal`
    // Les contraintes du formulaire correspondent aussi à des messages d'erreur
    const registerParams = {email: this.email, username: this.username, password: this.password };
    if (this.formIsValid) {
      this.applicationService
        .register(registerParams)
        .subscribe(
          (user) => {
            sessionStorage.setItem("user", JSON.stringify(user));
            this.router.navigate(["home"]);
            Swal.fire(
              "Inscription réussie",
              "Vous êtes à présent connecté",
              "success"
            );
          },
          (err) => {
            console.error(err);

            if (err.status === 409) {
              this.errorMessage =
                "Le nom d'utilisateur ou l'adresse email existe déjà.";
            } else {
              this.errorMessage =
                "Une erreur s'est produite lors de l'inscription.";
            }

            Swal.fire("Erreur", this.errorMessage, "error");
          }
        );
    } else {
      Swal.fire(
        "Erreur",
        "Veuillez remplir le formulaire correctement",
        "error"
      );
    }
  }
}
