/*
 * Created on 21-Feb-2005
 */
package org.mikejones.coriolis.tapestry.pages;

import org.apache.tapestry.annotations.InjectObject;
import org.apache.tapestry.html.BasePage;
import org.mikejones.coriolis.managers.api.PostManager;
import org.mikejones.coriolis.om.Post;

/**
 * @author <a href="mailTo:michael.daniel.jones@gmail.com" >mike</a>
 */
public abstract class ViewPost extends BasePage {

    @InjectObject("service:blog.PostManager")
    public abstract PostManager getPostManager();

    //  public abstract CommentManager getCommentManager();

    public abstract Post getPost();

    public abstract void setPost(Post post);

    public abstract Integer getPostId();

    public abstract void setPostId(Integer post);

    public abstract String getAuthor();

    public abstract void setAuthor(String auhor);

    public abstract String getAuthorWebsite();

    public abstract void setAuthorWebsite(String website);

    public abstract String getAuthorComment();

    public abstract void setAuthorComment(String authorComment);

    public abstract void setMessage(String message);

    public void viewPost(Integer postId) {
        PostManager postManager = getPostManager();
        setPostId(postId);
        setPost(postManager.getPost(postId));
        getRequestCycle().activate(this);
    }

}
