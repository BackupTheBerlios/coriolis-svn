/*
 * created on 05-Dec-2005
 */
package org.mikejones.coriolis;

import java.util.Date;
import java.util.List;

import org.hibernate.Transaction;
import org.mikejones.coriolis.om.Comment;
import org.mikejones.coriolis.om.Post;

public class PostTest extends BaseCase {

    
    @SuppressWarnings("unchecked")
    public void testSavePost() throws Exception {
        Post post = new Post();
        post.setPostDate(new Date());
        post.setTitle("this is a title");
        post.setText("here is the text");
        
        Transaction t = session.beginTransaction();
        session.save(post);
        t.commit();
        
        List<Post> posts = session.createQuery("from " + Post.class.getName()).list();
        
        assertTrue(posts.size()==1);        
    }
    
    public void testSavePostWithComments() throws Exception {
        Post post = new Post();
        post.setPostDate(new Date());
        post.setTitle("this is a title");
        post.setText("here is the text");
        
        Comment comment = new Comment();
        comment.setAuthor("author");
        comment.setComment("comment");
        comment.setDate(new Date());
        
        post.addComment(comment);
        
        Transaction t = session.beginTransaction();
        session.save(post);
        t.commit();        
    }
}




