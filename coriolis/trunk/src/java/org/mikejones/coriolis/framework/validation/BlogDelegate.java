/*
 * 
 */
package org.mikejones.coriolis.framework.validation;

import org.apache.tapestry.IMarkupWriter;
import org.apache.tapestry.IRequestCycle;
import org.apache.tapestry.form.IFormComponent;
import org.apache.tapestry.valid.IValidator;
import org.apache.tapestry.valid.ValidationDelegate;

/**
 *
 * @author <a href="mailTo:michael.jones@anite.com">Mike</a>
 */
public class BlogDelegate extends ValidationDelegate {
    
    /**
     * Called BEFORE the FieldLabel renders
     * @param writer
     * @param cycle
     * @param component
     * @param validator
     */
    public void writeLabelPrefix(IMarkupWriter writer, IRequestCycle cycle,
            IFormComponent component, IValidator validator) {
        
        writer.begin("label");
        
        if(isInError(component)) {
            writer.attribute("class", "error");
        }

    }
    
    /**
     * Called AFTER the FieldLabel renders
     * @param writer
     * @param cycle
     * @param component
     */
    public void writeLabelSuffix(IMarkupWriter writer, IRequestCycle cycle,
            IFormComponent component) {
        writer.end();
        
    }
    
    /**
     * Called BEFORE ValidField renders
     * 
     * @param writer
     * @param cycle
     * @param component
     */
    public void writePrefix(IMarkupWriter writer, IRequestCycle cycle,
            IFormComponent component) {
        
    }
    
    /**
     * Called AFTER ValidField renders
     * @param writer
     * @param cycle
     * @param component
     */
    public void writeSuffix(IMarkupWriter writer, IRequestCycle cycle,
            IFormComponent component, IValidator validator) {
        if(validator!=null && validator.isRequired()) {
            writer.print("*");
            
        }
    }
    
    /**
     * Called AS the ValidField renders
     * @param writer
     * @param cycle
     * @param component
     */
    public void writeAttributes(IMarkupWriter writer, IRequestCycle cycle,
            IFormComponent component, IValidator validator) {  
        
        if( isInError(component)) {
            writer.attribute("class", "error");            
        }
       
    }
}
