package org.mikejones.coriolis;

import java.util.Date;
import junit.framework.TestCase;

import org.mikejones.coriolis.om.*;

public class CommentHelper extends TestCase {

	private static final String COMMENT_AUTHOR = "author";
	private static final String COMMENT_COMMENT = "comment";
	private static final Date COMMENT_DATE = new Date(); 
	
	public static Comment createComment() {
		Comment result = new Comment();
    	result.setAuthor(COMMENT_AUTHOR);
    	result.setComment(COMMENT_COMMENT);
    	result.setDate(COMMENT_DATE);
    	return result;
	}
	
	public static void assertComment(Comment comment) {
		assertEquals(COMMENT_AUTHOR, comment.getAuthor());
		assertEquals(COMMENT_COMMENT, comment.getComment());
		assertEquals(COMMENT_DATE, comment.getDate());
	}
}
