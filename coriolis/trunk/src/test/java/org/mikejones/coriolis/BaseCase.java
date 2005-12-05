/*
 * created on 05-Dec-2005
 */
package org.mikejones.coriolis;

import junit.framework.TestCase;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.fulcrum.hivemind.RegistryManager;
import org.apache.hivemind.Registry;
import org.apache.hivemind.Resource;
import org.apache.hivemind.impl.DefaultClassResolver;
import org.apache.hivemind.util.ClasspathResource;
import org.hibernate.Session;

public class BaseCase extends TestCase {

    protected static Log log = LogFactory.getLog(BaseCase.class);

    protected Session session;

    protected static Registry registry;

    @Override
    public void setUp() throws Exception {
        Resource resource = new ClasspathResource(new DefaultClassResolver(), "META-INF/hivemodule_test.xml");
        RegistryManager.getInstance().getResources().add(resource);
        registry = RegistryManager.getInstance().getRegistry();
        session = (Session) registry.getService("fulcrum.hibernate.Session", Session.class);

    }

    @Override
    protected void tearDown() throws Exception {
        session.close();
        registry.cleanupThread();
    }

}
