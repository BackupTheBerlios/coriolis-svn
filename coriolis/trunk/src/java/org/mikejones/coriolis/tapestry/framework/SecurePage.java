/*
 * Created on 27-Feb-2005
 */
package org.mikejones.coriolis.tapestry.framework;

import org.apache.tapestry.PageRedirectException;
import org.apache.tapestry.event.PageEvent;
import org.apache.tapestry.event.PageValidateListener;
import org.apache.tapestry.form.IFormComponent;
import org.apache.tapestry.html.BasePage;
import org.apache.tapestry.valid.IValidationDelegate;
import org.apache.tapestry.valid.ValidationConstraint;
import org.mikejones.coriolis.tapestry.framework.aso.Visit;

public class SecurePage extends BasePage implements PageValidateListener {

    public void pageValidate(PageEvent pageEvent) {
        Visit visit = (Visit) getVisit();
        if (!visit.isUserLoggedIn()) {
            throw new PageRedirectException("Home");
        }

    }

    protected void error(IValidationDelegate delegate, String componentId, String message, ValidationConstraint constraint) {
        IFormComponent component = (IFormComponent) getComponent(componentId);
        delegate.setFormComponent(component);
        delegate.record(message, constraint);
    }

}
