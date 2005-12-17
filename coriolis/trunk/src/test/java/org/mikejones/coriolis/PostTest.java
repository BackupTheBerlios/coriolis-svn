/*
 * created on 05-Dec-2005
 */
package org.mikejones.coriolis;

import org.hibernate.Transaction;
import org.mikejones.coriolis.om.*;

public class PostTest extends BaseCase {

    public void testSavePost() throws Exception {
        Post post = PostHelper.createPost();
        
        Transaction t = session.beginTransaction();
        session.save(post);
        t.commit();
        
        Post saved = (Post)session.get(Post.class, post.getId());
        PostHelper.assertPost(saved);
    }
    
    public void testSavePostWithComments() throws Exception {
        Post post = PostHelper.createPostWithComment();
        
        Transaction t = session.beginTransaction();
        session.save(post);
        t.commit();        
        
        Post saved = (Post)session.get(Post.class, post.getId());
        PostHelper.assertPostWithComment(saved);
    }
    
	public void testSavePostWithCategory() throws Exception {
    	Post post = PostHelper.createPostWithCategory();
    	
    	Transaction t = session.beginTransaction();
    	session.save(post);
    	t.commit();
    	
    	Post saved = (Post)session.get(Post.class, post.getId());
    	PostHelper.assertPostWithCategory(saved);
    }
    
}




