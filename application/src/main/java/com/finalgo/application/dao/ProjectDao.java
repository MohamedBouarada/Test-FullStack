package com.finalgo.application.dao;
import com.finalgo.application.entity.Project;
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Service
public class ProjectDao extends AbstractGenericDao<Project> {

    @PersistenceContext
    private EntityManager entityManager;

    public ProjectDao() {
        super(Project.class);
    }

    @Transactional(readOnly = true)
    public List<Project> findByOwnerUsername(String ownerUsername) {
        Session session = entityManager.unwrap(Session.class);
        Query<Project> query = session.createQuery(
                "SELECT p FROM Project p WHERE p.ownerUsername = :ownerUsername", Project.class);
        query.setParameter("ownerUsername", ownerUsername);

        return query.getResultList();
    }

}
