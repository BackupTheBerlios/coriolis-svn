/*
 * created on 14-Dec-2005
 */
package org.mikejones.coriolis.tapestry.framework.services;

import java.io.IOException;
import java.io.OutputStream;
import java.util.Date;
import java.util.HashMap;

import org.apache.tapestry.IRequestCycle;
import org.apache.tapestry.engine.IEngineService;
import org.apache.tapestry.engine.ILink;
import org.apache.tapestry.services.LinkFactory;
import org.apache.tapestry.util.ContentType;
import org.apache.tapestry.web.WebResponse;

/**
 * A service to produces the rss for the blog
 *
 * @author <a href="mailTo:michael.jones@anite.com">Mike</a>
 */
public class RssService implements IEngineService {

    private WebResponse response;

    private RssProvider rssProvider;
    
    private LinkFactory linkFactory;

    public LinkFactory getLinkFactory() {
		return linkFactory;
	}

	public void setLinkFactory(LinkFactory linkFactory) {
		this.linkFactory = linkFactory;
	}

	public RssProvider getRssProvider() {
        return rssProvider;
    }

    public void setRssProvider(RssProvider rssProvider) {
        this.rssProvider = rssProvider;
    }

    /**
     * inject by hivemind
     * @return
     */
    public WebResponse getResponse() {
        return response;
    }

    public void setResponse(WebResponse response) {
        this.response = response;
    }

    public ILink getLink(boolean post, Object object) {
    	return linkFactory.constructLink(this, post, new HashMap() , false );        
    }

    public void service(IRequestCycle cycle) throws IOException {
        // oh my goodness just looking into what mime type to use for an rss feed
        // opend can of worms that has give me the fear so I am just going to use
        // application/rss+xml and to hell wtih text/xml(dont hate me)

        // Getting the content type and length is very dependant
        // on support from the application server (represented
        // here by the servletContext).

        String contentType = "application/rss+xml";
        String string = rssProvider.getRSS();
        response.setContentLength(string.getBytes().length);

        // TODO need to do something here to find out when the last post was added
        response.setDateHeader("Last-Modified", new Date().getTime());
        response.setDateHeader("Expires", new Date().getTime());

        // Set the content type. If the servlet container doesn't
        // provide it, try and guess it by the extension.

        OutputStream output = response.getOutputStream(new ContentType(contentType));
        output.write(string.getBytes());
    }

    /*
     *  (non-Javadoc)
     * @see org.apache.tapestry.engine.IEngineService#getName()
     */
    public String getName() {
        return "rss";
    }    

}
