/*
 * Created on 15-Mar-2005
 */
package org.mikejones.coriolis.managers.impl;

import net.sf.hibernate.HibernateException;

import org.apache.commons.lang.exception.NestableRuntimeException;
import org.mikejones.coriolis.hibernate.services.api.ISessionManager;
import org.mikejones.coriolis.managers.api.CommentManager;
import org.mikejones.coriolis.om.Comment;
import org.mikejones.coriolis.om.Post;

public class HibernateCommentManager implements CommentManager {

    private ISessionManager iSessionManager;

    public void setSessionManager(ISessionManager iSessionManager) {
        this.iSessionManager = iSessionManager;
    }    

    public void addComment(Post post, Comment comment) {
        saveOrUpdate(comment);
    }   
    
    public void removePost(Comment comment) {        
        try {
            iSessionManager.beginTransaction();
            iSessionManager.getSession().delete(comment);
            iSessionManager.commitTransaction();
        } catch (HibernateException e) {
            throw new NestableRuntimeException(e);
        }
    }

    public void saveOrUpdate(Object object) {
       try {
            iSessionManager.beginTransaction();
            iSessionManager.getSession().saveOrUpdate(object);
            iSessionManager.commitTransaction();
        } catch (HibernateException e) {
            throw new NestableRuntimeException(e);
        }
    }
}
