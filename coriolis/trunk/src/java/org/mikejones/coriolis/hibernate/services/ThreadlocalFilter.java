/*
 * Created on 11-Mar-2005
 */
package org.mikejones.coriolis.hibernate.services;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.apache.hivemind.Registry;
import org.apache.hivemind.servlet.HiveMindFilter;
import org.mikejones.coriolis.hibernate.services.api.ISessionManager;

public class ThreadlocalFilter implements Filter {

    public void init(FilterConfig config) throws ServletException {
        // do nowt 

    }

    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse,
            FilterChain chain) throws IOException, ServletException {
        Registry registry = HiveMindFilter.getRegistry((HttpServletRequest) servletRequest);
        ISessionManager sessionManager = (ISessionManager) registry.getService(ISessionManager.class);
        try {
            chain.doFilter(servletRequest, servletResponse);            
            sessionManager.commitTransaction();
            
        } finally {
            sessionManager.closeSession();
        }

    }

    public void destroy() {
        // do nowt
    }

}
