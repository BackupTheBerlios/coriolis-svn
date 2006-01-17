/*
 * created on 16-Aug-2005
 */
package org.mikejones.coriolis.tapestry.components.postcalendar;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.apache.tapestry.BaseComponent;
import org.apache.tapestry.IMarkupWriter;
import org.apache.tapestry.IPage;
import org.apache.tapestry.IRequestCycle;
import org.apache.tapestry.annotations.InjectObject;
import org.mikejones.coriolis.managers.api.PostManager;
import org.mikejones.coriolis.om.Post;
import org.mikejones.coriolis.tapestry.framework.services.AjaxUpdatable;
import org.mikejones.coriolis.tapestry.pages.ViewPosts;

public abstract class PostCalendar extends BaseComponent implements AjaxUpdatable {

    public static SimpleDateFormat dateFormat = new SimpleDateFormat("MMMMM yyyy");

    public static SimpleDateFormat ajaxLinkDateFormat = new SimpleDateFormat("MM/yyyy");

    @InjectObject("service:coriolis.managers.PostManager")
    public abstract PostManager getPostManager();

    public abstract Month getMonth();

    public abstract void setMonth(Month month);

    public abstract List<Week> getWeeks();

    public abstract Week getWeek();

    public abstract List<Day> getDays();

    public abstract Day getDay();

    public abstract CalendarConfig getCalendarConfig();

    public abstract void setCalendarConfig(CalendarConfig calendarConfig);

    protected List<Integer> findDaysWithPosts() {
        List<Post> posts = getPostManager().getPostsForMonth(getCalendarConfig().getCalendar());
        List<Integer> days = new ArrayList<Integer>();

        Calendar calendar = getCalendarConfig().getCalendar();
        for (Post post : posts) {
            calendar.setTime(post.getPostDate());
            days.add(calendar.get(Calendar.DAY_OF_MONTH));
        }
        return days;
    }

    @Override
    protected void prepareForRender(IRequestCycle cycle) {

        if (getCalendarConfig() == null)
            setCalendarConfig(new CalendarConfig(Calendar.getInstance()));

        Month month = new Month();

        month.setDescription(dateFormat.format(getCalendarConfig().getCalendar().getTime()));

        List<Integer> days = findDaysWithPosts();

        for (int i = 0; i < getCalendarConfig().getWeeksInMonth(); i++) {
            month.addWeek(createWeek(i, days));
        }

        setMonth(month);

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

    protected Week createWeek(int weekNumber, List<Integer> postDays) {
        int firstTdNumber = (weekNumber * 7) + 1;
        int lastTdNumber = firstTdNumber + 7;
        int firstDay = getCalendarConfig().getFirstDayOfMonth();
        int lastDayTD = getCalendarConfig().getDaysInMonth() + firstDay;

        Week week = new Week();

        // TODO really need to look at this

        for (int i = firstTdNumber; i < lastTdNumber; i++) {

            Day day = new Day();
            if (i < firstDay || i >= lastDayTD) {
                // dont need to do owt
            } else {
                // need to add a check for today
                int dayNumber = i + 1 - firstDay;

                if (postDays.contains(dayNumber)) {
                    day.setHasPost(true);
                }

                Calendar dayc = getCalendarConfig().createCalendar(dayNumber);
                day.setDay(dayc);

                if (getCalendarConfig().getMonth() == Calendar.getInstance().get(Calendar.MONTH)) {
                    day.setToday(getCalendarConfig().getToday() == dayNumber);
                }

            }
            week.addDay(day);
        }
        return week;
    }

    /**
     * Utility method to the previous date in the 
     * @return
     */
    public String previousDate() {
        Calendar calendar = getCalendarConfig().getCalendar();
        calendar.add(Calendar.MONTH, -1);
        return ajaxLinkDateFormat.format(calendar.getTime());
    }

    public String nextDate() {
        Calendar calendar = getCalendarConfig().getCalendar();
        calendar.add(Calendar.MONTH, 1);
        return ajaxLinkDateFormat.format(calendar.getTime());
    }

    public void prepageForAjaxRender(IMarkupWriter writer, Object params) {

        Object[] pars = (Object[]) params;
        try {
            Date date = ajaxLinkDateFormat.parse(((String) pars[0]));
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(date);

            if (calendar.get(Calendar.MONTH) == Calendar.getInstance().get(Calendar.MONTH)) {
                setCalendarConfig(new CalendarConfig(Calendar.getInstance()));
            } else {
                setCalendarConfig(new CalendarConfig(calendar));
            }
        } catch (ParseException e) {
            // default back to normal
            setCalendarConfig(new CalendarConfig(Calendar.getInstance()));
        }

    }

}
