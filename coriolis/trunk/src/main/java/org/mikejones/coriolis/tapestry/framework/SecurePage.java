/*
 * Created on 27-Feb-2005
 */
package org.mikejones.coriolis.tapestry.framework;

import org.apache.tapestry.PageRedirectException;
import org.apache.tapestry.annotations.InjectState;
import org.apache.tapestry.event.PageEvent;
import org.apache.tapestry.event.PageValidateListener;
import org.apache.tapestry.html.BasePage;
import org.mikejones.coriolis.tapestry.framework.aso.BlogVisit;

public abstract class SecurePage extends BasePage implements PageValidateListener {

    @InjectState("blogVisit")
    public abstract BlogVisit getBlogVisit();
    
    public void pageValidate(PageEvent pageEvent) {
        // TODO this creates it we need to just check it
        BlogVisit visit = getBlogVisit();
        if (!visit.isUserLoggedIn()) {
            throw new PageRedirectException("Login");
        } 

    }
//
//    protected void error(IValidationDelegate delegate, String componentId, String message, ValidationConstraint constraint) {
//        IFormComponent component = (IFormComponent) getComponent(componentId);
//        delegate.setFormComponent(component);
//        delegate.record(message, constraint);
//    }

}
