/*
 * created on 21-Nov-2005
 */
package org.mikejones.moray.components;

import org.apache.tapestry.AbstractComponent;
import org.apache.tapestry.IMarkupWriter;
import org.apache.tapestry.IRequestCycle;
import org.apache.tapestry.IScript;
import org.apache.tapestry.TapestryUtils;
import org.apache.tapestry.annotations.InjectScript;

public abstract class Accordian extends AbstractComponent {
    @InjectScript("Accordian.script")
    public abstract IScript getAccordianScript();

    @Override
    protected void renderComponent(IMarkupWriter writer, IRequestCycle cycle) {
        writer.begin("div");
        writer.attribute("id", getId());
        
        renderBody(writer, cycle);
        
        writer.end();
        
        getAccordianScript().execute(cycle, TapestryUtils.getPageRenderSupport(cycle, this), null);

    }

}
