package org.mikejones.coriolis;

import org.hibernate.Transaction;
import org.mikejones.coriolis.om.Blog;
import org.mikejones.coriolis.om.Post;

public class SetupBlog extends BaseCase {
	
	public void testSetUp() throws Exception {
        Post post = PostHelper.createPost();
        Blog blog = BlogHelper.createBlog();
        Transaction t = session.beginTransaction();
        session.save(post);
        session.save(blog);
        t.commit();
        
        Post saved = (Post)session.get(Post.class, post.getId());
        PostHelper.assertPost(saved);
    }

}
