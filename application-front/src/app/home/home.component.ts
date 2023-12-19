import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { Router } from '@angular/router';
import { ApplicationService } from '../service/application.service';
import { Project } from '../model/project.model';
import Swal from 'sweetalert2';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  formIsValid : boolean;
  user: User;
  projects: Array<Project>;

  name: string;
  amount: number;
  description: string;

  constructor(
    private router: Router,
    private applicationService: ApplicationService
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.getUserProjects();
  }

  getUser(): void {
    this.user = JSON.parse(sessionStorage.getItem("user"));
    if (this.user === null) {
      this.router.navigate(["login"]);
    }
  }

  // TODO : Récupérer la liste des projets lié à cette utilisateur
  // Cette fonction ne fait rien pour l'instant
  // -> Il faut remplir la liste de projet `this.projects`
  getUserProjects(): void {
    this.applicationService.getProjects(this.user.username).subscribe(
      (projects) => {
        this.projects = projects;
      },
      (error) => {
        console.error("Error loading user projects:", error);
      }
    );
  }

  // TODO : Sauvegarder les informations d'un projet grâce au formulaire
  // -> Appeler le backend pour créer le projet avec les bonnes informations
  // -> Ne pas oublier d'ajouter l'username de l'utilisateur
  // -> Après avoir sauvegarder le projet, l'ajouter  dans `this.projects`
  onSubmit(): void {
    if (this.formIsValid) {
      const project: Project = {
        name: this.name,
        amount: this.amount,
        description: this.description,
        ownerUsername: this.user.username,
      };

      this.applicationService.saveProject(project).subscribe(
        (savedProject) => {
          this.projects.push(savedProject);
          Swal.fire(
            "Projet sauvegardé",
            "Le projet a été sauvegardé avec succès",
            "success"
          );
        },
        (error) => {
          console.error("Error saving project:", error);
          Swal.fire(
            "Erreur",
            "Une erreur est survenue lors de la sauvegarde du projet",
            "error"
          );
        }
      );
    } else {
      Swal.fire(
        "Formulaire invalide",
        "Veuillez remplir correctement le formulaire",
        "warning"
      );
    }
  }
  validateForm(): void {
    this.formIsValid = false;
    if (
      this.name && this.description && this.amount > 0
    ) {
      this.formIsValid = true;
    }
  }
  

  logout(): void {
    sessionStorage.clear();
    this.router.navigate(["/login"]);
    Swal.fire(
      "Déconnexion réussie",
      "Vous êtes à présent déconnecté",
      "success"
    );
  }

  // TODO : Validation du formulaire
  // -> Le nom et la description du projet doivent être rempli
  // -> Le montant du projet doit être un nombre positif
  // Attention au typage des valeurs
  onInputUpdate(value: string, field: string): void {
    this[field] = value;
    console.log(`value : ${value}; field : ${field}`);
    this.validateForm();
  }
}
