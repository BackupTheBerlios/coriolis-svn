/*
 * Created on 07-Mar-2005
 */
package org.mikejones.coriolis.framework;

import org.apache.hivemind.Registry;
import org.apache.hivemind.impl.RegistryBuilder;
import org.apache.tapestry.engine.BaseEngine;

public class BlogEngine extends BaseEngine {

   
    
    /**
     * 
     */
    private static final long serialVersionUID = 1L;
    

    private Registry registry = RegistryBuilder.constructDefaultRegistry();
    
    public Registry getRegistry() {
        return registry;
    }

}
