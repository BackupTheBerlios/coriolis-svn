/*
 * created on 09-Jan-2006
 */
package org.mikejones.coriolis.tapestry.components.ajax;

import java.util.HashMap;
import java.util.Map;

import org.apache.tapestry.AbstractComponent;
import org.apache.tapestry.IMarkupWriter;
import org.apache.tapestry.IRequestCycle;
import org.apache.tapestry.IScript;
import org.apache.tapestry.TapestryUtils;
import org.apache.tapestry.annotations.InjectObject;
import org.apache.tapestry.annotations.InjectScript;
import org.apache.tapestry.annotations.Parameter;
import org.apache.tapestry.engine.IEngineService;
import org.apache.tapestry.engine.ILink;
import org.mikejones.coriolis.tapestry.framework.services.AjaxDirectServiceParameter;

public abstract class AjaxDirectLink extends AbstractComponent {

    protected static String SYM_COMPONENT_NAME = "component";

    protected static String SYM_LINK = "link";

    @InjectObject("engine-service:ajaxdirect")
    public abstract IEngineService getAjaxDirectService();

    @InjectScript("AjaxDirectLink.script")
    public abstract IScript getAjaxDirectScript();

    @Parameter(required = true)
    public abstract String getTargetComponentId();

    @Parameter
    public abstract Object getParameters();

    @Override
    protected void renderComponent(IMarkupWriter writer, IRequestCycle cycle) {

        // contruct the object array from the parameters passed in
        Object[] serviceParameters = AjaxDirectServiceParameter.constructServiceParameters(getParameters());
        AjaxDirectServiceParameter serviceParameter = new AjaxDirectServiceParameter(this, serviceParameters);

        ILink link = getAjaxDirectService().getLink(false, serviceParameter);

        Map<String, String> params = new HashMap<String, String>();

        String absUrl = link.getAbsoluteURL();
        String[] urlParts = absUrl.split("\\?");

        params.put(SYM_LINK, urlParts[0]);

        params.put(SYM_COMPONENT_NAME, getTargetComponentId());

        getAjaxDirectScript().execute(cycle, TapestryUtils.getPageRenderSupport(cycle, this), params);

        writer.begin("a");
        writer.attribute("href", "javascript:getHTML('" + urlParts[1] + "')");
        renderBody(writer, cycle);
        writer.end("a");

    }

}
