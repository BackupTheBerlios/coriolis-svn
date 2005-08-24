/*
 * Created on 27-Feb-2005
 */
package org.mikejones.coriolis.framework;

import org.apache.tapestry.PageRedirectException;
import org.apache.tapestry.event.PageEvent;
import org.apache.tapestry.event.PageValidateListener;
import org.apache.tapestry.html.BasePage;

public class SecurePage extends BasePage implements PageValidateListener {

    public void pageValidate(PageEvent pageEvent) {
        Visit visit = (Visit) getVisit();
        if (!visit.isUserLoggedIn()) {
            throw new PageRedirectException("Home");
        }

    }

}
