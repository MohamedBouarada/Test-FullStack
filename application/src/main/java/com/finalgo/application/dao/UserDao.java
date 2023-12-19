package com.finalgo.application.dao;

import com.finalgo.application.entity.User;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Root;

import org.springframework.stereotype.Service;
import org.hibernate.query.Query;
import org.hibernate.Session;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;
import javax.persistence.criteria.CriteriaQuery;
import org.springframework.transaction.annotation.Transactional;
@Service
public class UserDao extends AbstractGenericDao<User> {

    public UserDao() {
        super(User.class);
    }

    /**
     * Récupèrer l'utilisateur correspondant aux paramètres suivant:
     * @param username
     * @param password
     * @return User
     *
     * TODO : Implémenter la requête Hibernate/SQL
     */
    @PersistenceContext
    private EntityManager entityManager;

    public User findWithCredentials(String username, String password) {
        Session session = entityManager.unwrap(Session.class);
        CriteriaBuilder criteriaBuilder = session.getCriteriaBuilder();
        CriteriaQuery<User> criteriaQuery = criteriaBuilder.createQuery(User.class);
        Root<User> root = criteriaQuery.from(User.class);
        criteriaQuery.select(root);
        criteriaQuery.where(criteriaBuilder.equal(root.get("username"), username),
                            criteriaBuilder.equal(root.get("password"), password));

        Query<User> query = session.createQuery(criteriaQuery);
        List<User> resultList = query.getResultList();
        System.out.println(resultList);
        
        return resultList.isEmpty() ? null : resultList.get(0);
    }

        @Transactional(readOnly = true)
    public boolean existsByUsername(String username) {
        Session session = entityManager.unwrap(Session.class);
        Query<Long> query = session.createQuery(
                "SELECT COUNT(u) FROM User u WHERE u.username = :username", Long.class);
        query.setParameter("username", username);

        Long count = query.getSingleResult();
        return count > 0;
    }

    @Transactional(readOnly = true)
    public boolean existsByEmail(String email) {
        Session session = entityManager.unwrap(Session.class);

        Query<Long> query = session.createQuery(
                "SELECT COUNT(u) FROM User u WHERE u.email = :email", Long.class);
        query.setParameter("email", email);

        Long count = query.getSingleResult();
        return count > 0;
    }

}
