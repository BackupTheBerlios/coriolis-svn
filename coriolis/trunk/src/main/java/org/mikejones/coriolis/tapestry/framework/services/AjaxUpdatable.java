/*
 * created on 09-Jan-2006
 */
package org.mikejones.coriolis.tapestry.framework.services;

import org.apache.tapestry.IComponent;
import org.apache.tapestry.IMarkupWriter;

public interface AjaxUpdatable extends IComponent {
    
    public void prepageForAjaxRender(IMarkupWriter writer, Object params);

}
