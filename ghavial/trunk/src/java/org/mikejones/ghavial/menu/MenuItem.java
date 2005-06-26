/*
 * created on Apr 7, 2005
 */
package org.mikejones.ghavial.menu;

import org.apache.tapestry.BaseComponent;
import org.apache.tapestry.IRender;
import org.apache.tapestry.IRequestCycle;

/**
 *
 * @author <a href="mailTo:michael.jones@anite.com">Mike</a>
 */
public abstract class MenuItem extends BaseComponent {

    public abstract boolean getContainsChildItems();

    public abstract void setContainsChildItems(boolean isSubmenu);

    /* (non-Javadoc)
     * @see org.apache.tapestry.AbstractComponent#prepareForRender(org.apache.tapestry.IRequestCycle)
     */
    protected void prepareForRender(IRequestCycle arg0) {
        super.prepareForRender(arg0);

        IRender[] body = getBody();
        
        if (body != null) {
            bodyLoop: for (int i = 0; i < body.length; i++) {
                
                if (body[i] instanceof MenuItem) {
                    
                   setContainsChildItems(true);
                    break bodyLoop;
                }
            }
        }
    }
}
