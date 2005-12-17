package org.mikejones.coriolis;

import java.util.Date;

import org.mikejones.coriolis.om.Category;
import org.mikejones.coriolis.om.Comment;
import org.mikejones.coriolis.om.Post;

import junit.framework.TestCase;

public class PostHelper extends TestCase {

	private static final String POST_TITLE = "title";
	private static final String POST_TEXT = "text";
	private static final Date POST_DATE = new Date();
	
	public static Post createPost() {
		Post result = new Post();
    	result.setPostDate(POST_DATE);
    	result.setTitle(POST_TITLE);
    	result.setText(POST_TEXT);
    	return result;
	}
	
	public static Post createPostWithComment() {
		Post result = PostHelper.createPost();
        Comment comment = CommentHelper.createComment();
        result.addComment(comment);
        return result;
	}
	
	public static Post createPostWithCategory() {
		Post result = PostHelper.createPost();
    	Category category = CategoryHelper.createCategory();
    	result.addCategory(category);
    	return result;
	}
	
	public static void assertPost(Post post) {
		assertEquals(POST_DATE, post.getPostDate());
    	assertEquals(POST_TITLE, post.getTitle());
    	assertEquals(POST_TEXT, post.getText());
	}
	
	public static void assertPostWithComment(Post post) {
		PostHelper.assertPost(post);
    	assertEquals(1, post.getComments().size());
    	Comment comment = post.getComments().get(0);
    	CommentHelper.assertComment(comment);
	}
	
	public static void assertPostWithCategory(Post post) {
		PostHelper.assertPost(post);
    	assertEquals(1, post.getCategories().size());
    	Category category = post.getCategories().get(0);
    	CategoryHelper.assertCategory(category);
	}
}

