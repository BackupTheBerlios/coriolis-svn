/*
 * Created on 09-Mar-2005
 */
package org.mikejones.coriolis.hibernate.services.impl;

import net.sf.hibernate.HibernateException;
import net.sf.hibernate.Session;
import net.sf.hibernate.SessionFactory;
import net.sf.hibernate.Transaction;
import net.sf.hibernate.cfg.Configuration;

import org.apache.commons.lang.exception.NestableRuntimeException;
import org.mikejones.coriolis.hibernate.services.api.ISessionManager;

/**
 * This should be implemented as a singleton service
 * 
 * TODO: need to add logging here because we loose the exceptions inside tapestry
 * 
 * @author <a href="mailTo:michael.daniel.jones@gmail.com" >mike</a>
 */
public class ThreadlocalSessionManager implements ISessionManager {

    private static SessionFactory sessionFactory;

    private ThreadLocal threadSession = new ThreadLocal();

    private ThreadLocal threadTransaction = new ThreadLocal();

    public ThreadlocalSessionManager() {
        if (sessionFactory == null) {
            Configuration configuration = new Configuration();
            try {
                sessionFactory = configuration.configure()
                        .buildSessionFactory();
            } catch (HibernateException e) {
                throw new NestableRuntimeException();
                // TODO add logging here
            }
        }

    }

    public Session getSession() {
        Session s = (Session) threadSession.get();
        if (s == null) {
            try {
                s = sessionFactory.openSession();
            } catch (HibernateException e) {
                throw new RuntimeException();
            }
            threadSession.set(s);
        }
        return s;
    }

    public void closeSession() {
        Session s = (Session) threadSession.get();
        if (s != null && s.isOpen()) {
            try {
                s.close();
            } catch (HibernateException e) {
                throw new RuntimeException();
            }
        }

    }

    public void beginTransaction() {
        Transaction tx = (Transaction) threadTransaction.get();
        if (tx != null) {
            try {
                tx = getSession().beginTransaction();
            } catch (HibernateException e) {
                throw new RuntimeException();
            }
        }
    }

    public void commitTransaction() {
        Transaction tx = (Transaction) threadTransaction.get();
        try {
            if (tx != null && !tx.wasCommitted() && !tx.wasRolledBack()) {
                tx.commit();
            }
        } catch (HibernateException e) {
            rollbackTransaction();
            throw new RuntimeException();
        }
    }

    public void rollbackTransaction() {
        Transaction tx = (Transaction) threadTransaction.get();
        try {
            if (tx != null && !tx.wasCommitted() && !tx.wasRolledBack()) {
                tx.rollback();
            }
        } catch (HibernateException e) {
            rollbackTransaction();
            throw new RuntimeException();
        } finally {
            closeSession();
        }
    }

}