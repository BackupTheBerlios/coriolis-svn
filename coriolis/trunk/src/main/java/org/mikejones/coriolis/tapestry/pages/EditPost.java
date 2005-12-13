/*
 * Created on 06-Mar-2005
 */
package org.mikejones.coriolis.tapestry.pages;

import org.apache.tapestry.annotations.Bean;
import org.apache.tapestry.annotations.InjectObject;
import org.apache.tapestry.valid.IValidationDelegate;
import org.mikejones.coriolis.managers.api.PostManager;
import org.mikejones.coriolis.om.Post;
import org.mikejones.coriolis.tapestry.framework.SecurePage;
import org.mikejones.coriolis.tapestry.framework.validation.BlogDelegate;

public abstract class EditPost extends SecurePage {

    public abstract void setPostId(Integer id);

    public abstract Integer getPostId();

    public abstract void setPost(Post post);

    public abstract Post getPost();

    @InjectObject("service:blog.PostManager")
    public abstract PostManager getPostManager();

    @Bean(BlogDelegate.class)
    public abstract IValidationDelegate getDelegate();

    public void loadPost() {
        Post post = getPostManager().getPost(getPostId());
        setPost(post);
    }

    public String updatePost() {
        if (!getDelegate().isInError()) {
            getPostManager().savePost(getPost());
            return "Home";
        }
        return null;
    }

}
