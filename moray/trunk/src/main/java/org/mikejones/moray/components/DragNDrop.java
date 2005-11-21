/*
 * created on 21-Nov-2005
 */
package org.mikejones.moray.components;

import org.apache.tapestry.AbstractComponent;
import org.apache.tapestry.IMarkupWriter;
import org.apache.tapestry.IRequestCycle;
import org.apache.tapestry.IScript;
import org.apache.tapestry.annotations.InjectScript;

public abstract class DragNDrop extends AbstractComponent {
    
    @InjectScript("DragNDrop.script")
    public abstract IScript getDragNDropScript();

    @Override
    protected void renderComponent(IMarkupWriter arg0, IRequestCycle arg1) {
        // TODO Auto-generated method stub
        
    }

}
