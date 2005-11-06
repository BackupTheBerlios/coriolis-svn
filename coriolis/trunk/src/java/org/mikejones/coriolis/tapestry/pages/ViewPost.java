/*
 * Created on 21-Feb-2005
 */
package org.mikejones.coriolis.tapestry.pages;

import org.apache.commons.lang.StringUtils;
import org.apache.hivemind.Registry;
import org.apache.hivemind.servlet.HiveMindFilter;
import org.apache.tapestry.IRequestCycle;
import org.apache.tapestry.html.BasePage;
import org.mikejones.coriolis.managers.api.CommentManager;
import org.mikejones.coriolis.managers.api.PostManager;
import org.mikejones.coriolis.om.Comment;
import org.mikejones.coriolis.om.Post;

/**
 * @author <a href="mailTo:michael.daniel.jones@gmail.com" >mike</a>
 */
public abstract class ViewPost extends BasePage {

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

    public void viewPost(IRequestCycle cycle, Integer postId) {
        Registry registry = HiveMindFilter.getRegistry(cycle
                .getRequestContext().getRequest());
        PostManager postManager = (PostManager) registry
                .getService(PostManager.class);
        setPostId(postId);
        setPost(postManager.getPost(postId));
        cycle.activate(this);
    }

    public void addComment(IRequestCycle cycle) {
        Registry registry = HiveMindFilter.getRegistry(cycle
                .getRequestContext().getRequest());

        PostManager postManager = (PostManager) registry
                .getService(PostManager.class);

        CommentManager commentManager = (CommentManager) registry
                .getService(CommentManager.class);

        if (StringUtils.isEmpty(getAuthor())
                || StringUtils.isEmpty(getAuthorComment())) {
            setMessage("The author and comment fields must not be empty!");
        } else {
            
            Post post = postManager.getPost(getPostId());
            
            Comment comment = new Comment();
            comment.setAuthor(getAuthor());
            comment.setComment(getAuthorComment());
            comment.setPost(post);                
            post.addComment(comment);
            
            postManager.saveOrUpdate(post);
            commentManager.saveOrUpdate(comment);
        
            // reset the field values
            setAuthor("");
            setAuthorWebsite("");
            setAuthorComment("");

        }
        viewPost(cycle, getPostId());
    }
}
