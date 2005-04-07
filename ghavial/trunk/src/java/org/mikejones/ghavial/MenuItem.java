/*
 * created on Apr 7, 2005
 */
package org.mikejones.ghavial;

import java.util.Map;

import org.apache.tapestry.BaseComponent;
import org.apache.tapestry.IAsset;

/**
 *
 * @author <a href="mailTo:michael.jones@anite.com">Mike</a>
 */
public abstract class MenuItem extends BaseComponent {
    
    public abstract IAsset getImage();
    
    public boolean hasChildItems() {
        Map components = getComponents();
        return false;
        
    }

}
