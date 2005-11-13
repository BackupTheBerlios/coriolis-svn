/*
 * Created on 24-May-2005
 */
package org.mikejones.coriolis.hibernate.services.factory;

import org.apache.commons.logging.Log;
import org.apache.hivemind.ServiceImplementationFactory;
import org.apache.hivemind.ServiceImplementationFactoryParameters;
import org.apache.hivemind.events.RegistryShutdownListener;
import org.apache.hivemind.service.ThreadCleanupListener;
import org.apache.hivemind.service.ThreadEventNotifier;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.AnnotationConfiguration;
import org.mikejones.coriolis.om.Comment;
import org.mikejones.coriolis.om.Person;
import org.mikejones.coriolis.om.Post;

public class HibernateSessionFactory implements ServiceImplementationFactory, RegistryShutdownListener {

    private SessionFactory sessionFactory;

    private ThreadEventNotifier threadEventNotifier;

    private Log log;

    public void init() {
        log.debug("Initializing Hibernate SessionFactory...");

        AnnotationConfiguration config = new AnnotationConfiguration();
        config.addAnnotatedClass(Post.class);
        config.addAnnotatedClass(Comment.class);
        config.addAnnotatedClass(Person.class);

        sessionFactory = config.buildSessionFactory();

    }

    public Object createCoreServiceImplementation(ServiceImplementationFactoryParameters parameters) {

        log.debug("Creating Hibernate Session...");

        Session session = sessionFactory.openSession();
        threadEventNotifier.addThreadCleanupListener(new SessionCloser(session));
        return session;

    }

    /*
     * public Object createCoreServiceImplementation(
     * ServiceImplementationFactoryParameters params) { }
     */
    public void registryDidShutdown() {
        log.debug("Closing Hibernate SessionFactory...");
        sessionFactory.close();                
    }

    public void setThreadEventNotifier(ThreadEventNotifier notifier) {
        this.threadEventNotifier = notifier;
    }

    public void setLog(Log log) {
        this.log = log;
    }

    private class SessionCloser implements ThreadCleanupListener {
        private final Session session;

        public SessionCloser(Session session) {
            this.session = session;
        }

        public void threadDidCleanup() {
            log.debug("Closing Hibernate Session...");

            session.close();

            threadEventNotifier.removeThreadCleanupListener(this);
        }
    }

}
