package org.mikejones.coriolis.tapestry.pages;

import java.util.List;

import org.apache.tapestry.annotations.InjectObject;
import org.apache.tapestry.annotations.Parameter;
import org.apache.tapestry.html.BasePage;
import org.mikejones.coriolis.managers.api.CategoryManager;
import org.mikejones.coriolis.om.Post;

public abstract class ViewPosts extends BasePage {

	public abstract List<Post> getPosts();
	
	public abstract void setPosts(List<Post> posts);
	
	public abstract Post getPost();
	
}
