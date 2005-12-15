/*
 * created on 14-Dec-2005
 */
package org.mikejones.coriolis.tapestry.service;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Date;
import java.util.List;

import org.apache.hivemind.util.IOUtils;
import org.apache.tapestry.IRequestCycle;
import org.apache.tapestry.engine.IEngineService;
import org.apache.tapestry.engine.ILink;
import org.apache.tapestry.util.ContentType;
import org.apache.tapestry.web.WebResponse;
import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.dom4j.io.OutputFormat;
import org.dom4j.io.XMLWriter;
import org.mikejones.coriolis.managers.api.PostManager;
import org.mikejones.coriolis.om.Post;

/**
 * A service to produces the rss for the blog
 *
 * @author <a href="mailTo:michael.jones@anite.com">Mike</a>
 */
public class RssService implements IEngineService {

    private static final int BUFFER_SIZE = 10240;

    private WebResponse response;

    private PostManager postManager;

    public PostManager getPostManager() {
        return postManager;
    }

    public void setPostManager(PostManager postManager) {
        this.postManager = postManager;
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

    public ILink getLink(boolean b, Object object) {
        return null;
    }

    public void service(IRequestCycle cycle) throws IOException {
        // oh my goodness just looking into what mime type to use for an rss feed
        // opend can of worms that has give me the fear so I am just going to use
        // text/xml and to hell wtih application/rss+xml (dont hate me)
        InputStream input = null;

        // Getting the content type and length is very dependant
        // on support from the application server (represented
        // here by the servletContext).

        String contentType = "text/xml";
        String string = writeRSS();
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

    /**
     * write out the post stuff
     * @return
     */
    protected String writeRSS() {
        Document document = DocumentHelper.createDocument();

        Element rss = document.addElement("rss");
        rss.addAttribute("version", "2.0");
        Element channel = rss.addElement("channel");
        channel.addElement("title").addText("title");
        channel.addElement("link").addText("link");

        List<Post> posts = postManager.getPosts();

        for (Post post : posts) {
            Element item = channel.addElement("item");
            item.addElement("title").setText(post.getTitle());
            item.addElement("link").setText("need a link maker");

            // TODO stip out the html stuff
            item.addElement("description").setText(post.getText());

            // TODO prob need a format for that
            item.addElement("pubDate").setText("time");
            item.addElement("guid").setText(post.getId().toString());
        }

        return document.asXML();

    }
}
