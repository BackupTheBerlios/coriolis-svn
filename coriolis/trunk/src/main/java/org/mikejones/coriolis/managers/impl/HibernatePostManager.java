/*
 * created on 10-Nov-2005
 */
package org.mikejones.coriolis.managers.impl;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.Transaction;
import org.mikejones.coriolis.managers.api.PostManager;
import org.mikejones.coriolis.om.Post;


public class HibernatePostManager implements PostManager {
    
    public Session session;
    
    /**
     * Get the injected session
     * @return
     */
    public Session getSession() {
        return session;
    }

    /**
     * Method to inject the session
     * @param session
     */
    public void setSession(Session session) {
        this.session = session;
    }

    public Post getPost(int index) {
        // TODO Auto-generated method stub
        return null;
    }

    public Post getPost(Integer id) {
        return (Post) session.load(Post.class, id);
    }

    /**
     * Return all the posts
     */    
    @SuppressWarnings("unchecked")
    public List<Post> getPosts() {
        return session.createQuery("from " + Post.class.getName()).list();
    }

    public void savePost(Post post) {
        Transaction t = session.beginTransaction();
        session.save(post);
        t.commit();
    }

    public void deletePost(Post post) {
        // TODO Auto-generated method stub
        
    }

    public void deletePost(Integer id) {
        Transaction t = session.beginTransaction();
        Post post = getPost(id);
        session.delete(post);
        t.commit();        
    }

    
}
