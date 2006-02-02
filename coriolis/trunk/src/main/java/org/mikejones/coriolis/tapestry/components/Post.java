/*
 * created on 06-Nov-2005
 */
package org.mikejones.coriolis.tapestry.components;

import java.text.Format;
import java.text.SimpleDateFormat;

import org.apache.tapestry.BaseComponent;
import org.apache.tapestry.IPage;
import org.apache.tapestry.annotations.InjectObject;
import org.mikejones.coriolis.managers.api.CategoryManager;
import org.mikejones.coriolis.managers.api.PostManager;
import org.mikejones.coriolis.om.Category;
import org.mikejones.coriolis.tapestry.pages.EditPost;
import org.mikejones.coriolis.tapestry.pages.Home;
import org.mikejones.coriolis.tapestry.pages.ViewPost;
import org.mikejones.coriolis.tapestry.pages.ViewPosts;

public abstract class Post extends BaseComponent {

    @InjectObject("service:coriolis.managers.PostManager")
    public abstract PostManager getPostManager();
    
    @InjectObject("service:coriolis.managers.CategoryManager")
    public abstract CategoryManager getCategoryManager();

    public abstract Category getCurrentCategory();
    
    private Format dateFormat;

    public Format getDateFormat() {
        if (dateFormat == null)
            dateFormat = new SimpleDateFormat("dd MMMM yyyy");
        return dateFormat;
    }

    public void viewPost(Integer id) {
        ViewPost page = (ViewPost) getPage().getRequestCycle().getPage("ViewPost");
        page.viewPost(new Integer(id));
    }

    public IPage editPost(Integer id) {
        EditPost editPost = (EditPost) getPage().getRequestCycle().getPage("EditPost");
        editPost.setPost(getPostManager().getPost(id));
        editPost.setPostId(id);
        return editPost;
    }

    public String deletePost(Integer id) {
        getPostManager().deletePost(id);
        return null;
    }
    
    public IPage viewPostsInCategory(Integer categoryId) {
    		ViewPosts page = (ViewPosts)getPage().getRequestCycle().getPage("ViewPosts");
    		page.setPosts(getCategoryManager().getCategory(categoryId).getPosts());
    		return page;
    }
}
