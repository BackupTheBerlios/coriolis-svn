package org.mikejones.coriolis.tapestry.components.postcalendar;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.apache.tapestry.AbstractComponent;
import org.apache.tapestry.IActionListener;
import org.apache.tapestry.IDirect;
import org.apache.tapestry.IMarkupWriter;
import org.apache.tapestry.IPage;
import org.apache.tapestry.IRequestCycle;
import org.apache.tapestry.Tapestry;
import org.apache.tapestry.annotations.InjectObject;
import org.apache.tapestry.annotations.Parameter;
import org.apache.tapestry.engine.DirectServiceParameter;
import org.apache.tapestry.engine.IEngineService;
import org.apache.tapestry.engine.ILink;
import org.apache.tapestry.link.DirectLink;
import org.mikejones.coriolis.managers.api.PostManager;
import org.mikejones.coriolis.om.Post;
import org.mikejones.coriolis.tapestry.framework.services.AjaxUpdatable;
import org.mikejones.coriolis.tapestry.pages.ViewPosts;

public abstract class AjaxPostCalendar extends AbstractComponent implements IDirect, AjaxUpdatable {
    
    public static SimpleDateFormat ajaxLinkDateFormat = new SimpleDateFormat("MM/yyyy");
    
    public void prepageForAjaxRender(IMarkupWriter writer, Object params) {
        
        Object[] pars = (Object[]) params;
        try {
            Date date = ajaxLinkDateFormat.parse(((String)pars[0]));
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(date);
            setCalendarConfig(new CalendarConfig(calendar));
        } catch (ParseException e) {
            // default back to normal
            setCalendarConfig(new CalendarConfig(Calendar.getInstance()));
        }
       
        
    }
    
    private static SimpleDateFormat dateFormat = new SimpleDateFormat("MMMMM yyyy");

    public static SimpleDateFormat linkDateFormat = new SimpleDateFormat("dd/MM/yyyy");

    public abstract CalendarConfig getCalendarConfig();

    public abstract void setCalendarConfig(CalendarConfig calendarConfig);

    @InjectObject("engine-service:direct")
    public abstract IEngineService getDirectService();

    @InjectObject("service:coriolis.managers.PostManager")
    public abstract PostManager getPostManager();

    @Parameter(required = true)
    public abstract IActionListener getListener();

    public void trigger(IRequestCycle cycle) {
        IActionListener listener = getListener();
        if (listener == null)
            throw Tapestry.createRequiredParameterException(this, "listener");
        listener.actionTriggered(this, cycle);
    }

    public boolean isStateful() {
        return false;
    }

    /*
     *  (non-Javadoc)
     * @see org.apache.tapestry.AbstractComponent#prepareForRender(org.apache.tapestry.IRequestCycle)
     */
    @Override
    protected void prepareForRender(IRequestCycle cycle) {
        if (getCalendarConfig() == null)
            setCalendarConfig(new CalendarConfig(Calendar.getInstance()));

    }

    protected void renderComponent(IMarkupWriter writer, IRequestCycle cycle) {
        if (cycle.isRewinding())
            return;

        List<Integer> daysWithPosts = findDaysWithPosts();

        writer.begin("div");
        writer.attribute("class", "calendar");
        writer.attribute("id", getId());

        writer.begin("h3");
        writer.print("date");
        writer.end();

        writer.begin("table");

        writeTableHead(writer);

        writer.begin("tbody");

        for (int week = 0; week < getCalendarConfig().getWeeksInMonth(); week++) {
            writeWeekRow(writer, week, daysWithPosts);
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

    private void writeWeekRow(IMarkupWriter writer, int week, List<Integer> daysWithPosts) {

        CalendarConfig calendarConfig = getCalendarConfig();
        int firstTdNumber = (week * 7) + 1;
        int lastTdNumber = firstTdNumber + 7;
        int lastDayTD = calendarConfig.getDaysInMonth() + calendarConfig.getFirstDayOfMonth();

        writer.begin("tr");

        for (int i = firstTdNumber; i < lastTdNumber; i++) {
            if (i < calendarConfig.getToday() || i >= lastDayTD) {
                writeDateTD(writer, 0, false, false);
            } else {
                // need to add a check for today
                int dayNumber = i + 1 - calendarConfig.getFirstDayOfMonth();
                boolean isToday = (dayNumber == getCalendarConfig().getToday());
                writeDateTD(writer, dayNumber, isToday, daysWithPosts.contains(dayNumber));
            }
        }
        writer.end();

    }

    private void writeDateTD(IMarkupWriter writer, Integer day, boolean today, boolean hasPosts) {
        writer.begin("td");
        if (today) {
            writer.attribute("class", "current");
        }
        if (hasPosts) {
            writeLink(writer, day);
        } else {
            writer.print(day.toString());
            writer.end();
        }
    }

    private void writeLink(IMarkupWriter writer, Integer day) {
        Object[] serviceParameters = DirectLink.constructServiceParameters(linkDateFormat.format(getCalendarConfig()
                .createDate(day)));

        DirectServiceParameter dsp = new DirectServiceParameter(this, serviceParameters);
        ILink link = getDirectService().getLink(false, dsp);

        writer.begin("a");
        writer.attribute("href", link.getURL());
        writer.print(day.toString());
        writer.end("a");  

    } //    private void writeDayRow(IMarkupWriter writer);

    private void writeTH(IMarkupWriter writer, String value) {
        writer.begin("th");
        writer.print(value);
        writer.end();
    }

    protected List<Integer> findDaysWithPosts() {
        List<Post> posts = getPostManager().getPostsForMonth();
        List<Integer> days = new ArrayList<Integer>();

        Calendar calendar = Calendar.getInstance();
        for (Post post : posts) {
            calendar.setTime(post.getPostDate());
            days.add(calendar.get(Calendar.DAY_OF_MONTH));
        }
        return days;
    }

    public IPage postsForDate(IRequestCycle cycle, String dateString) {
        try {
            Date date = Day.dateFormat.parse(dateString);
            List<Post> posts = getPostManager().getPostForDate(date);
            ViewPosts viewPosts = (ViewPosts) cycle.getPage("ViewPosts");
            viewPosts.setPosts(posts);
            return viewPosts;

        } catch (ParseException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return null;

    }

}
