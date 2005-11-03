/*
 * Created on 07-Mar-2005
 */
package org.mikejones.coriolis.tapestry.framework;

import org.apache.hivemind.Registry;
import org.apache.hivemind.servlet.HiveMindFilter;
import org.apache.tapestry.IRequestCycle;
import org.apache.tapestry.engine.BaseEngine;
import org.mikejones.coriolis.hibernate.services.api.ISessionManager;

public class BlogEngine extends BaseEngine {

    /**
     * 
     */
    private static final long serialVersionUID = 1L;

    
    /**
     * the session is lazy instantiated so just need to ensure its closed 
     * at the end of each request. 
     */
    protected void cleanupAfterRequest(IRequestCycle cycle) {
        super.cleanupAfterRequest(cycle);
        
        Registry registry = HiveMindFilter.getRegistry(cycle
                .getRequestContext().getRequest());
        ISessionManager sessionManager = (ISessionManager) registry
                .getService(ISessionManager.class);
        
        try {
            sessionManager.commitTransaction();
        } finally {
            sessionManager.closeSession();
        }

    }

    // private Registry registry = RegistryBuilder.constructDefaultRegistry();

    public Registry getRegistry(IRequestCycle cycle) {
        return HiveMindFilter.getRegistry(cycle.getRequestContext()
                .getRequest());
    }

}
