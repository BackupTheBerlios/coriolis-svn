/*
 * Created on 09-Mar-2005
 */
package org.mikejones.coriolis.managers.impl;

import java.util.List;

import net.sf.hibernate.HibernateException;
import net.sf.hibernate.Session;

import org.apache.commons.lang.exception.NestableRuntimeException;
import org.mikejones.coriolis.hibernate.services.api.ISessionManager;
import org.mikejones.coriolis.managers.api.IPostManager;
import org.mikejones.coriolis.om.Post;

public class HibernatePostManager implements IPostManager {

    private ISessionManager iSessionManager;

    public void setSessionManager(ISessionManager iSessionManager) {
        this.iSessionManager = iSessionManager;
    }

    public Post getPost(int id) {
        return getPost(new Integer(id));
    }

    public Post getPost(Integer id) {
        Session session = iSessionManager.getSession();
        try {
            return (Post) session.load(Post.class, id);
        } catch (HibernateException e) {
            throw new NestableRuntimeException(e);
        }

    }

    public List getPosts() {
        Session session = iSessionManager.getSession();
        try {
            return session.find("from " + Post.class.getName());
        } catch (HibernateException e) {
            throw new NestableRuntimeException(e);
        }
    }

    public void addPost(Post post) {
        saveOrUpdate(post);
    }

    public void removePost(Post post) {
        Session session = iSessionManager.getSession();
        try {
            session.delete(post);
        } catch (HibernateException e) {
            throw new NestableRuntimeException(e);
        }
    }

    public void removePost(Integer id) {
        removePost(getPost(id));
    }

    public void saveOrUpdate(Post post) {
        Session session = iSessionManager.getSession();
        try {
            session.saveOrUpdate(post);
        } catch (HibernateException e) {
            throw new NestableRuntimeException(e);
        }
    }

}
