import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../service/application.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formIsValid: boolean;
  email: string;
  username: string;
  password: string;

  constructor(
    private applicationService: ApplicationService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

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
    if (this.username) {
        this.formIsValid = true;
    }
  }

  onSubmit(): void {
    // TODO Gérer les échecs d'inscription
    // Losqu'un utilisateur existe déjà, cette requête ne devrait pas fonctionner,
    // Il faut donc afficher le bon message d'erreur avec une alerte via `Swal`
    // Les contraintes du formulaire correspondent aussi à des messages d'erreur
    this.applicationService.register(this.username, this.password, this.email).subscribe((user) => {
      sessionStorage.setItem('user', JSON.stringify(user));
      this.router.navigate(['home']);
      Swal.fire('Inscription réussie', 'Vous êtes à présent connecté', 'success');
    }, (err) => {
        console.error(err);
    });
  }
}
