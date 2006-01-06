/*
 * created on 03-Jan-2006
 */
package org.mikejones.coriolis.tapestry.components.postcalendar;

import java.util.ArrayList;
import java.util.List;

public class Month {
    
    private List<Week> weeks = new ArrayList<Week>();
    
    private String description;

    public List<Week> getWeeks() {
        return weeks;
    }

    public void setWeeks(List<Week> weeks) {
        this.weeks = weeks;
    }
    
    public void addWeek(Week week) {
        this.weeks.add(week);
    }
    
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

}
