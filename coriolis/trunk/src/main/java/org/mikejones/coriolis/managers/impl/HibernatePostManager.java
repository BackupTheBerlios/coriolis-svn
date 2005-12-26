/*
 * created on 10-Nov-2005
 */
package org.mikejones.coriolis.managers.impl;

import java.util.List;

import org.hibernate.Transaction;
import org.mikejones.coriolis.managers.api.PostManager;
import org.mikejones.coriolis.om.Post;


public class HibernatePostManager extends HibernateManager implements PostManager {
    
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
        return session.createQuery("from " + Post.class.getName() + " post order by post.postDate desc").list() ;
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
