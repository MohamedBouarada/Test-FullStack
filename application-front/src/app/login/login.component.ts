import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApplicationService } from '../service/application.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  formIsValid :boolean;
  username: string;
  password: string;

  constructor(
    private applicationService: ApplicationService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    console.log("submit");
    // TODO : Gérer les échecs de connexion
    // Losque les informations ne sont pas bonnes et que le backend renvoie une erreur,
    // Il faut afficher le bon message d'erreur avec une alerte via `Swal`
    const loginParams = { username: this.username, password: this.password };
    console.log(loginParams);
    this.applicationService.login(loginParams).subscribe(
      (user) => {
        sessionStorage.setItem("user", JSON.stringify(user));
        this.router.navigate(["/home"]);
        Swal.fire(
          "Connexion réussie",
          "Vous êtes à présent connecté",
          "success"
        );
      },
      (err) => {
        console.error(err);
        let errorMessage = "Une erreur s'est produite lors de la connexion.";

        if (err.status === 404) {
          errorMessage = "Nom d'utilisateur ou mot de passe incorrect.";
        }

        Swal.fire("Erreur de connexion", errorMessage, "error");
      }
    );
  }

  // TODO : réaliser le binding entre les inputs et les attributs du component
  onInputUpdate(value: string, field: string): void {
    this[field] = value;
    this.validateForm();
  }

  validateForm(): void {
    this.formIsValid = false;
    if (
      this.username &&
      this.password &&
      this.password.length > 0 &&
      this.username.length > 0
    ) {
      this.formIsValid = true;
    }
  }
}
