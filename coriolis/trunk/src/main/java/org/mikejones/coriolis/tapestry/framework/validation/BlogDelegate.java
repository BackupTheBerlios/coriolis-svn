/*
 * 
 */
package org.mikejones.coriolis.tapestry.framework.validation;

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
     * 
     */
    private static final long serialVersionUID = 1L;

    /* (non-Javadoc)
     * @see org.apache.tapestry.valid.ValidationDelegate#writeLabelPrefix(org.apache.tapestry.form.IFormComponent, org.apache.tapestry.IMarkupWriter, org.apache.tapestry.IRequestCycle)
     */
    public void writeLabelPrefix(IFormComponent component, IMarkupWriter writer, IRequestCycle cycle) {
        //Called BEFORE the FieldLabel renders

    	if (isInError(component)) {
            writer.begin("span");
            writer.attribute("class", "error");
        }
    }

    /* (non-Javadoc)
     * @see org.apache.tapestry.valid.ValidationDelegate#writeLabelSuffix(org.apache.tapestry.form.IFormComponent, org.apache.tapestry.IMarkupWriter, org.apache.tapestry.IRequestCycle)
     */
    public void writeLabelSuffix(IFormComponent component, IMarkupWriter writer, IRequestCycle cycle) {
        if (isInError(component)) {
        	writer.end();
        }
    }

    /* (non-Javadoc)
     * @see org.apache.tapestry.valid.ValidationDelegate#writePrefix(org.apache.tapestry.IMarkupWriter, org.apache.tapestry.IRequestCycle, org.apache.tapestry.form.IFormComponent, org.apache.tapestry.valid.IValidator)
     */
    public void writePrefix(IMarkupWriter writer, IRequestCycle cycle, IFormComponent component, IValidator validator) {
    	if (component.isRequired()) {
            writer.print("*");
        }
    }

    /**
     * Called AFTER ValidField renders
     * @param writer
     * @param cycle
     * @param component
     */
    public void writeSuffix(IMarkupWriter writer, IRequestCycle cycle, IFormComponent component, IValidator validator) {
        
    }

    /**
     * Called AS the ValidField renders
     * @param writer
     * @param cycle
     * @param component
     */
    public void writeAttributes(IMarkupWriter writer, IRequestCycle cycle, IFormComponent component,
            IValidator validator) {

        

    }

}