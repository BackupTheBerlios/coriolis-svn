/*
 * created on 11-Dec-2005
 */
package org.mikejones.coriolis.tapestry.components;

import org.apache.tapestry.AbstractComponent;
import org.apache.tapestry.IMarkupWriter;
import org.apache.tapestry.IRequestCycle;
import org.apache.tapestry.annotations.Parameter;

public abstract class Toggler extends AbstractComponent {
    
    @Parameter(required=true)
    public abstract Toggleable getToggleable();
    
    @Parameter(required=true) 
    public abstract String getText();

    @Override
    protected void renderComponent(IMarkupWriter writer, IRequestCycle cycle) {
        //        <div dojoType="Toggler" targetId="explode" style="float: left; text-decoration: underline;">
        //            explode
        //        </div>
        writer.begin("div");
        writer.attribute("dojoType", "Toggler");
        writer.attribute("targetId", getToggleable().getComponentId());
        writer.attribute("style", "float: left; text-decoration: underline;");
        writer.print(getText());
        writer.end();

    }

}
