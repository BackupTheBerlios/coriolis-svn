/*
 * Created on 19-Mar-2005
 */
package org;

import junit.framework.TestCase;
import net.sf.hibernate.Session;
import net.sf.hibernate.SessionFactory;
import net.sf.hibernate.Transaction;
import net.sf.hibernate.cfg.Configuration;

import org.mikejones.coriolis.om.Comment;
import org.mikejones.coriolis.om.Post;

public class HIbernateTest extends TestCase {
    
    private SessionFactory sessionFactory;
    
    public SessionFactory getSessionFactory()  throws Exception  {
        if(sessionFactory == null) {
            Configuration configuration = new Configuration();
            sessionFactory = configuration.configure()
                    .buildSessionFactory();
        }
        return sessionFactory;
    }

    public void testHIbernate() throws Exception {
        Session testSession = getSessionFactory().openSession();
        
        Post post = new Post();
        post.setText("text");
        post.setTitle("title");
        
        Transaction tx = testSession.beginTransaction();
        testSession.saveOrUpdate(post);
        tx.commit();
        testSession.flush();
        
        testSession.close();
        
   }
    
    public void testCommentCreation() throws Exception {
        Session session = getSessionFactory().openSession();              
        Transaction tx = session.beginTransaction();
        
        Post post = new Post();
        post.setTitle("post with comments");
        post.setText("post with comments");
        
        session.saveOrUpdate(post);
        
        Comment c1 = new Comment();
        c1.setComment("comment one");
        c1.setPost(post);
        
        post.addComment(c1);
        
        
        
        
        Comment c2 = new Comment();
        c2.setComment("comment two");
        c2.setPost(post);       
        post.addComment(c1);
        
        session.saveOrUpdate(post);
        session.saveOrUpdate(c1);
        session.saveOrUpdate(c2);
        
        tx.commit();
        session.close();        

        
        
    }

}
