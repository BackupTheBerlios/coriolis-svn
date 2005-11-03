/*
 * Created on 26-Feb-2005
 */
package org.mikejones.coriolis.tapestry.pages;

import java.util.Calendar;
import java.util.Date;

import org.apache.commons.lang.StringUtils;
import org.apache.hivemind.Registry;
import org.apache.hivemind.servlet.HiveMindFilter;
import org.apache.tapestry.IRequestCycle;
import org.apache.tapestry.event.PageEvent;
import org.apache.tapestry.event.PageRenderListener;
import org.apache.tapestry.form.IFormComponent;
import org.apache.tapestry.valid.IValidationDelegate;
import org.apache.tapestry.valid.ValidationConstraint;
import org.mikejones.coriolis.managers.api.PostManager;
import org.mikejones.coriolis.om.Post;
import org.mikejones.coriolis.tapestry.framework.SecurePage;

public abstract class NewPost extends SecurePage implements PageRenderListener {

    public abstract Post getPost();

    public abstract void setPost(Post post);

    /*
     * (non-Javadoc)
     * 
     * @see org.apache.tapestry.event.PageRenderListener#pageBeginRender(org.apache.tapestry.event.PageEvent)
     */
    public void pageBeginRender(PageEvent pageEvent) {
        if (getPost() == null) {
            setPost(new Post());
        }
    }

    private void error(IValidationDelegate delegate, String componentId, 
            String message, ValidationConstraint constraint) {
        IFormComponent component = (IFormComponent) getComponent(componentId);
        delegate.setFormComponent(component);
        delegate.record(message, constraint);
    }

    public void addPost(IRequestCycle cycle) {
        IValidationDelegate delegate = (IValidationDelegate) getBeans().getBean("delegate");

        if (StringUtils.isEmpty(getPost().getText())) {
            error(delegate, "inputText", "The text field is required.", ValidationConstraint.REQUIRED);
        }

        if (delegate.getHasErrors()) {
            return;
        }

        Registry registry = HiveMindFilter.getRegistry(cycle.getRequestContext().getRequest());
        PostManager postManager = (PostManager) registry.getService(PostManager.class);
        Post post = getPost();
        post.setDate(new Date(Calendar.getInstance().getTimeInMillis()));

        postManager.addPost(getPost());
        cycle.activate("Blog");
    }

}