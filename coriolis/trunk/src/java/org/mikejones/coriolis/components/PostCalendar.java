/*
 * created on 16-Aug-2005
 */
package org.mikejones.coriolis.components;

import java.text.SimpleDateFormat;
import java.util.Calendar;

import org.apache.tapestry.AbstractComponent;
import org.apache.tapestry.IMarkupWriter;
import org.apache.tapestry.IRequestCycle;

public class PostCalendar extends AbstractComponent {
    
    private static SimpleDateFormat dateFormat = new SimpleDateFormat("MMMMM yyyy");

    protected void renderComponent(IMarkupWriter writer, IRequestCycle cycle) {
        if (cycle.isRewinding())
            return;
        Calendar calendar = Calendar.getInstance();
        
        writer.begin("h2");
        writer.print(dateFormat.format(calendar.getTime()));
        writer.end();
        
        writer.begin("div");
        writer.attribute("class", "calendar");

        writer.begin("table");
        
        writeTableHead(writer);

        writer.begin("tbody");
        
        int firstDay = firtDayOfMonth();
        int daysInMonth = calendar.getMaximum(Calendar.DAY_OF_MONTH);
        int numberOfWeeks = numberOfWeeks(firstDay, daysInMonth);

        for (int i = 0; i < numberOfWeeks; i++) {
            writeWeekRow(writer, i, firstDay, daysInMonth, calendar.get(Calendar.DAY_OF_MONTH));
        }

        writer.end(); // end tbody 
        writer.end(); // end table
        writer.end(); // end div
    }
    
    private void writeTableHead(IMarkupWriter writer) {
        writer.begin("thead"); 
        writer.begin("tr");
        writeTH(writer, "S");
        writeTH(writer, "M");
        writeTH(writer, "T");
        writeTH(writer, "W");
        writeTH(writer, "T");
        writeTH(writer, "F");
        writeTH(writer, "S");
        writer.end(); // tr
        writer.end(); // thead
    }

    private void writeWeekRow(IMarkupWriter writer, int week, int firstDay, int daysInMonth, int today) {
        writer.begin("tr");

        int firstTdNumber = (week * 7) +1;
        int lastTdNumber = firstTdNumber + 7;
        int lastDayTD = daysInMonth + firstDay;

        for (int i = firstTdNumber; i < lastTdNumber; i++) {
            if (i < firstDay || i >= lastDayTD ) {
                writeDateTD(writer, "", false);
            } else {
                // need to add a check for today
                int dayNumber = i + 1 - firstDay;
                boolean isToday = today == dayNumber;                
                writeDateTD(writer, dayNumber + "", isToday);
            }
        }
        writer.end();

    }

    private int firtDayOfMonth() {
        Calendar calendar = Calendar.getInstance();
        calendar.set(Calendar.DAY_OF_MONTH, 1);
        return calendar.get(Calendar.DAY_OF_WEEK);
    }

    private int numberOfWeeks(int firstDayOfMonth, int daysInMonth) {
        int totalDays = daysInMonth + firstDayOfMonth +1;
        totalDays += (totalDays % 7);
        return totalDays / 7;
    }

    private void writeDateTD(IMarkupWriter writer, String value, boolean today) {
        writer.begin("td");
        if (today) {
            writer.attribute("class", "current");
        }
        writer.print(value);
        writer.end();
    }

    //    private void writeDayRow(IMarkupWriter writer);

    private void writeTH(IMarkupWriter writer, String value) {
        writer.begin("th");
        writer.print(value);
        writer.end();
    }

}
