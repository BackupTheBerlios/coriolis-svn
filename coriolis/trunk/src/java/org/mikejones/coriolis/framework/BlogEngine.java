/*
 * Created on 07-Mar-2005
 */
package org.mikejones.coriolis.framework;

import org.apache.hivemind.Registry;
import org.apache.hivemind.servlet.HiveMindFilter;
import org.apache.tapestry.IRequestCycle;
import org.apache.tapestry.engine.BaseEngine;
import org.apache.tapestry.request.RequestContext;
import org.mikejones.coriolis.hibernate.services.api.ISessionManager;

public class BlogEngine extends BaseEngine {
    
    /**
     * 
     */
    private static final long serialVersionUID = 1L;
    
    protected void setupForRequest(RequestContext context) {        
        super.setupForRequest(context);
    }
    
    protected void cleanupAfterRequest(IRequestCycle cycle) {
        super.cleanupAfterRequest(cycle);
        Registry registry = HiveMindFilter.getRegistry(cycle.getRequestContext().getRequest());
        ISessionManager sessionManager = (ISessionManager) registry.getService(ISessionManager.class);
        sessionManager.commitTransaction();
        sessionManager.closeSession();
        
    }

//    private Registry registry = RegistryBuilder.constructDefaultRegistry();
//    
//    public Registry getRegistry() {
//        return registry;
//    }

}
