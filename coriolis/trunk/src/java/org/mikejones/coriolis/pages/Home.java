/*
 * Created on 21-Feb-2005
 */
package org.mikejones.coriolis.pages;

import org.apache.tapestry.IRequestCycle;
import org.apache.tapestry.html.BasePage;

/**
 * @author <a href="mailTo:michael.daniel.jones@gmail.com" >mike</a>
 */
public class Home extends BasePage {
    
    /**
     * <p>This is a listener method: it has the right signature (it is a public void method
     * that takes a single parameter of type IRequestCycle). It can be referenced
     * using the OGNL expression <code>listeners.linkClicked</code>.
     * </p>
     * 
     * <p>
     * Normally, you wouldn't write a listener method this simple, since the
     * same thing can be accomplished using a PageLink component and no Java code.
     * </p>
     */
    public void linkClicked(IRequestCycle cycle)
    {
        // Activate a different page to render ther reponse sent
        // to the client web browser.
        
        cycle.activate("Blog");
    }

}
