/*
 * created on 07-Jan-2006
 */
package org.mikejones.coriolis.tapestry.framework.services;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

import org.apache.hivemind.util.Defense;
import org.apache.tapestry.IComponent;
import org.apache.tapestry.IMarkupWriter;
import org.apache.tapestry.IPage;
import org.apache.tapestry.IRequestCycle;
import org.apache.tapestry.PageRenderSupport;
import org.apache.tapestry.TapestryUtils;
import org.apache.tapestry.engine.IEngineService;
import org.apache.tapestry.engine.ILink;
import org.apache.tapestry.markup.MarkupWriterSource;
import org.apache.tapestry.services.LinkFactory;
import org.apache.tapestry.services.ServiceConstants;
import org.apache.tapestry.util.ContentType;
import org.apache.tapestry.web.WebResponse;
import org.mikejones.coriolis.tapestry.components.ajax.AjaxPageRenderSupport;

public class AjaxDirectService implements IEngineService {

    public static String NAME = "ajaxdirect";

    private LinkFactory linkFactory;

    private WebResponse webResponse;

    private MarkupWriterSource markupWriterSource;

    private IRequestCycle requestCycle;

    public LinkFactory getLinkFactory() {
        return linkFactory;
    }

    public void setLinkFactory(LinkFactory linkFactory) {
        this.linkFactory = linkFactory;
    }

    public WebResponse getWebResponse() {
        return webResponse;
    }

    public void setWebResponse(WebResponse webResponse) {
        this.webResponse = webResponse;
    }

    public ILink getLink(boolean post, Object parameter) {

        Defense.isAssignable(parameter, AjaxDirectServiceParameter.class, "parameter");

        AjaxDirectServiceParameter dsp = (AjaxDirectServiceParameter) parameter;

        IComponent component = dsp.getComponent();

        // use the component to determine the page, not the cycle.
        IPage activePage = requestCycle.getPage();
        IPage componentPage = component.getPage();

        Map<String, Object> parameters = new HashMap<String, Object>();

        //        boolean stateful = request.getSession(false) != null;

        parameters.put(ServiceConstants.SERVICE, getName());
        parameters.put(ServiceConstants.PAGE, activePage.getPageName());
        parameters.put(ServiceConstants.COMPONENT, component.getIdPath());
        parameters.put(ServiceConstants.CONTAINER, componentPage == activePage ? null : componentPage.getPageName());
        //        parameters.put(ServiceConstants.SESSION, stateful ? "T" : null);
        parameters.put(ServiceConstants.PARAMETER, dsp.getServiceParameters());

        //        Map<String, String> params = new HashMap<String, String>();
        //        params.put("component", "$Layout.postCalendar");
        return linkFactory.constructLink(this, post, parameters, false);

        //        return _linkFactory.constructLink(post, parameters, true);

    }

    public void service(IRequestCycle cycle) throws IOException {

        String componentId = cycle.getParameter(ServiceConstants.COMPONENT);
        String componentPageName = cycle.getParameter(ServiceConstants.CONTAINER);
        String activePageName = cycle.getParameter(ServiceConstants.PAGE);
        boolean activeSession = cycle.getParameter(ServiceConstants.SESSION) != null;
        
        IPage renderPage = cycle.getPage(activePageName);
        cycle.activate(renderPage);

        AjaxUpdatable component = (AjaxUpdatable) renderPage.getNestedComponent("$Layout.postCalendar");

        ContentType contentType = new ContentType("text/plain");

        PrintWriter printWriter = webResponse.getPrintWriter(contentType);

        IMarkupWriter writer = markupWriterSource.newMarkupWriter(printWriter, contentType);
        
        PageRenderSupport support = new AjaxPageRenderSupport();
        
        TapestryUtils.storePageRenderSupport(cycle, support);
        
        Object[] serviceParms = (Object[])linkFactory.extractListenerParameters(cycle);
        
        // use the actual writer only on the component
        component.prepageForAjaxRender(writer, serviceParms);

        ((IComponent) component).render(writer, cycle);

        writer.flush();

    }

    public String getName() {
        return NAME;
    }

    public MarkupWriterSource getMarkupWriterSource() {
        return markupWriterSource;
    }

    public void setMarkupWriterSource(MarkupWriterSource writerSource) {
        markupWriterSource = writerSource;
    }

    public IRequestCycle getRequestCycle() {
        return requestCycle;
    }

    public void setRequestCycle(IRequestCycle requestCycle) {
        this.requestCycle = requestCycle;
    }

}
