package org;
import junit.framework.TestCase;

import org.apache.hivemind.Registry;
import org.apache.hivemind.impl.RegistryBuilder;
import org.mikejones.coriolis.hibernate.services.api.ISessionManager;
import org.mikejones.coriolis.managers.api.IPostManager;

/*
 * Created on 10-Mar-2005
 */

public class HivemindTest extends TestCase {
    
    public void testThis() {
        Registry registry = RegistryBuilder.constructDefaultRegistry();
  
        ISessionManager sessionManager = (ISessionManager) registry.getService(ISessionManager.class);
        sessionManager.beginTransaction();
        
        IPostManager pm = (IPostManager) registry.getService(IPostManager.class);
        assertNotNull(pm.getPosts());
        
                
    }

}
