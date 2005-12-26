package org.mikejones.coriolis;

import org.mikejones.coriolis.om.Blog;

public class BlogHelper {

	public static String BLOG_TITLE = "[SET YOUR BLOG TITLE IN ADMIN]";

	public static Blog createBlog() {
		Blog blog = new Blog();
		blog.setTitle(BLOG_TITLE);
		return blog;

	}

}
