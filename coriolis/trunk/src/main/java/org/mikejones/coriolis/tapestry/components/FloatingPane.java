/*
 * created on 11-Dec-2005
 */
package org.mikejones.coriolis.tapestry.components;

import org.apache.tapestry.AbstractComponent;
import org.apache.tapestry.IMarkupWriter;
import org.apache.tapestry.IRequestCycle;
import org.apache.tapestry.IScript;
import org.apache.tapestry.TapestryUtils;
import org.apache.tapestry.annotations.InjectScript;
import org.apache.tapestry.annotations.Parameter;

public abstract class FloatingPane extends AbstractComponent implements Toggleable {

    @Parameter(required = true)
    public abstract String getTitle();

    @Parameter
    public abstract boolean getHasShaddow();

    @Parameter
    public abstract boolean getConstrainToContainer();

    @Parameter
    public abstract String getToggle();
    
    @InjectScript("FloatingPane.script")
    public abstract IScript getFloatingPaneScript();
    
    public String getComponentId() {
        return getId();
    }

    @Override
    protected void renderComponent(IMarkupWriter writer, IRequestCycle cycle) {
        //        <div dojoType="FloatingPane"
        //            id="wipe"
        //            title="window #3 w/shadow"
        //            constrainToContainer="true"
        //            hasShadow="true"
        //            style="width: 300px; height: 200px; left: 600px; display:none"
        //            toggle="wipe"
        //        >
        //                main panel with <a href="http://www.dojotoolkit.org/">a link</a>.<br />
        //                (to check we're copying children around properly).<br />
        //        </div>

        writer.begin("div");
        writer.attribute("dojoType", "FloatingPane");

        // TODO check if this can be overrode
        writer.attribute("id", getId());
        writer.attribute("title", getTitle());
        writer.attribute("hasShadow", getHasShaddow());
        writer.attribute("constrainToContainer", true);
        writer.attribute("toggle", getToggle());
        writer.attribute("style", "width: 300px; height: 200px; left: 200px; display:none;");
        
        renderBody(writer, cycle);
        
        writer.end();
        
        getFloatingPaneScript().execute(cycle, TapestryUtils.getPageRenderSupport(cycle, this), null);

    }

}
