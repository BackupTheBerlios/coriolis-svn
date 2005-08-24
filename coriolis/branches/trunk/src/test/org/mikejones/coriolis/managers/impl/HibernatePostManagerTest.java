/*
 * Created on 20-Mar-2005
 */
package org.mikejones.coriolis.managers.impl;

import junit.framework.TestCase;
import net.sf.hibernate.Session;

import org.easymock.MockControl;
import org.mikejones.coriolis.hibernate.services.api.ISessionManager;
import org.mikejones.coriolis.om.Post;

public class HibernatePostManagerTest extends TestCase {

    private MockControl controlISessionManager;
    
    private MockControl controlSession;

    private ISessionManager mockSessionManager;

    private HibernatePostManager postManager;
    
    private Session mockSession;

    public void setUp() {
        controlISessionManager = MockControl.createStrictControl(ISessionManager.class);        
        mockSessionManager = (ISessionManager) controlISessionManager.getMock();
        
        controlSession = MockControl.createNiceControl(Session.class);
        mockSession = (Session) controlSession.getMock();
        
        postManager = new HibernatePostManager();
        postManager.setSessionManager(mockSessionManager);
    }
    
    public void testRemovePost () {
        
        mockSessionManager.beginTransaction();
        mockSessionManager.getSession();
        controlISessionManager.setReturnValue(mockSession);
        mockSessionManager.commitTransaction();
        
        controlISessionManager.replay();
        
        postManager.removePost(new Post());
        
    }
    
    public void testSaveOrUpdate() throws Exception {
        mockSessionManager.getSession();
        controlISessionManager.setReturnValue(mockSession);
        
        mockSessionManager.beginTransaction();
        
        mockSessionManager.commitTransaction();
        
        controlISessionManager.replay();
        controlSession.replay();
        
        postManager.saveOrUpdate(new Post());

    }
    
    public void testGetPostWithInteger() throws Exception {
        mockSessionManager.getSession();
        controlISessionManager.setReturnValue(mockSession);
        
        mockSession.load(Post.class, new Integer(1));
        
    }

}
