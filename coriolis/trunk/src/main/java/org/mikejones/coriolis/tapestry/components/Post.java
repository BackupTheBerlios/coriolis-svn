/*
 * created on 06-Nov-2005
 */
package org.mikejones.coriolis.tapestry.components;

import java.text.Format;
import java.text.SimpleDateFormat;

import org.apache.tapestry.BaseComponent;
import org.apache.tapestry.IPage;
import org.apache.tapestry.annotations.InjectObject;
import org.apache.tapestry.annotations.InjectState;
import org.mikejones.coriolis.managers.api.PostManager;
import org.mikejones.coriolis.tapestry.framework.aso.BlogVisit;
import org.mikejones.coriolis.tapestry.pages.EditPost;
import org.mikejones.coriolis.tapestry.pages.ViewPost;

public abstract class Post extends BaseComponent {

    @InjectObject("service:coriolis.managers.PostManager")
    public abstract PostManager getPostManager();

    @InjectState("blogVisit")
    public abstract BlogVisit getBlogVisit();
    
    private Format dateFormat;

    public boolean getIsUserLoggedIn() {
    	return getBlogVisit().isUserLoggedIn();
    }
    
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
}
