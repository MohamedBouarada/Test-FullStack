package com.finalgo.application.api;

import com.finalgo.application.bean.LoginBean;
import com.finalgo.application.bean.ProjectBean;
import com.finalgo.application.bean.RegisterBean;
import com.finalgo.application.dao.UserDao;
import com.finalgo.application.entity.Project;
import com.finalgo.application.entity.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.logging.Level;
import java.util.logging.Logger;

@RestController
@RequestMapping("/application")
@ControllerAdvice
public class ApplicationRouting {

    private final UserDao userDao;
    private static final Logger logger = Logger.getLogger(ApplicationRouting.class.getName());


    public ApplicationRouting(UserDao userDao) {
        this.userDao = userDao;
    }

    /**
     * Inscription d'un utilisateur
     * @param registerBean Objet contenant les informations envoyées par le front
     * @return User créé suite à l'inscription
     *
     * TODO : Empêcher l'ajout d'un utilisateur déjà existant
     * -> doublon si l'username ou l'email est déjà existant
     * -> modifier la fonction pour ne pas avoir de doublon
     * -> renvoyer une erreur `HttpStatus.CONFLICT`
     */
    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody RegisterBean registerBean) {
        User user = new User();
        user.setUsername(registerBean.getUsername());
        user.setPassword(registerBean.getPassword());
        user.setEmail(registerBean.getEmail());
        userDao.create(user);
        return ResponseEntity.status(HttpStatus.OK).body(user);
    }

    /**
     * Connection d'un utilisateur
     * @param loginBean Objet contenant les informations envoyées par le front
     * @return User récupéré de la base de donnéees
     *
     * TODO : Implémenter la connection d'un utilisateur
     * -> Récupérer l'utilisateur dans la base de données avec le bon mot de passe
     * -> Si aucun utilisateur n'est trouvé, renvoyer une erreur `HttpStatus.NOT_FOUND`
     */
    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody LoginBean loginBean) {
        // TODO Implémenter la fonction `userDao.findWithCredentials` ci-dessous
        User user = userDao.findWithCredentials(loginBean.getUsername(), loginBean.getPassword());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(user);
    }

    /**
     * Sauvegarde d'un projet créé par l'utilisateur
     * @param projectBean Objet contenant les informations envoyées par le front
     * @return Projet créé
     *
     * TODO : Implémenter la sauvegarde d'un projet
     * -> Créer un projet
     * -> Sauvegarder le projet dans dans la base de données
     * -> Prendre exemple sur UserDao pour implémenter la connection Hibernate 'ProjectDao'
     */
    @PostMapping("/saveProject")
    public ResponseEntity<Project> saveProject(
            @RequestBody(required = false) ProjectBean projectBean
    ) {
        Project project = new Project(projectBean);
        return ResponseEntity.status(HttpStatus.OK).body(project);
    }

    /*
      TODO : Implémenter la requête pour récupérer des projets créés par un utilisateur
      Exemple de requête: GET -> localhost:8080/application/getProjects?ownerUsername=user1234
                              -> [{..}, {..}]
      Le seul paramètre sera un `ownerUsername`
      On veut une List<Project> récupérée de la table 'Project'
     */


    /**
     * TODO : Un ancien stagiaire a réalisé une API très instable en se basant sur du code
     *  obsolète, vous devez la moderniser en vous basant sur les API ci-dessus et la rendre stable
     * 1 : Refaire le mapping API/typage de façon à être le plus simple et précis possible
     * 2 : Identifier pourquoi l'API crash souvent et faire en sorte que ça n'arrive plus jamais,
     *     peut importe les paramètres envoyés et sans utiliser de try catch
     * 3 : Vous devez rendre le code de la fonction le plus propre et lisible possible
     * Quelques conseils :
     * - utiliser des variables (intermédiaires) correctement nommées
     * - faire des lignes simples et courtes (- de 80 caractères)
     * - éventuellement utiliser des formes ternaires pour des cas très simples
     *
     * Cet exemple est tirée de nos applications et est volontairement compliqué, faites ce que vous
     * pouvez sans y passer trop de temps (ce n'est pas le but)
     */
    @RequestMapping(value = "/saveInformationTabObject", method = RequestMethod.POST, consumes =
            {MediaType.APPLICATION_JSON_VALUE}, produces = {MediaType.APPLICATION_JSON_VALUE})
    public @ResponseBody
    ResponseEntity saveInformationTabObject(@RequestParam(required = false)  String attachedOc, @RequestParam(required = false) Integer attachedId,
                       @RequestBody Project attachedProject) throws Exception {
        String data_test = attachedProject.getName() + attachedProject.getDescription() + attachedProject.getOwnerUsername();
        logger.log(Level.INFO, attachedOc + 42 * attachedId +data_test.substring(12));
        return new ResponseEntity(
                attachedOc + 42 * attachedId+data_test.substring(12), HttpStatus.OK);

    }
}
