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
import org.apache.tapestry.IPage;
import org.apache.tapestry.IRequestCycle;
import org.apache.tapestry.annotations.InjectObject;
import org.mikejones.coriolis.managers.api.PostManager;
import org.mikejones.coriolis.om.Post;
import org.mikejones.coriolis.tapestry.pages.ViewPosts;

public abstract class PostCalendar extends BaseComponent {

    public static SimpleDateFormat dateFormat = new SimpleDateFormat("MMMMM yyyy");

    @InjectObject("service:coriolis.managers.PostManager")
    public abstract PostManager getPostManager();

    public abstract Month getMonth();

    public abstract void setMonth(Month month);

    public abstract List<Week> getWeeks();
    
    public abstract Week getWeek();

    public abstract List<Day> getDays();
    
    public abstract Day getDay();

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

    @Override
    protected void prepareForRender(IRequestCycle cycle) {
        Month month = new Month();

        Calendar calendar = Calendar.getInstance();

        month.setDescription(dateFormat.format(calendar.getTime()));

        List<Integer> days = findDaysWithPosts();

        int firstDay = firtDayOfMonth();
        int daysInMonth = calendar.getMaximum(Calendar.DAY_OF_MONTH);
        int numberOfWeeks = numberOfWeeks(firstDay, daysInMonth);

        for (int i = 0; i < numberOfWeeks; i++) {
            month.addWeek(createWeek(i, firstDay, daysInMonth, daysInMonth, days));
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

    protected Week createWeek(int weekNumber, int firstDay, int daysInMonth, int today, List<Integer> postDays) {
        int firstTdNumber = (weekNumber * 7) + 1;
        int lastTdNumber = firstTdNumber + 7;
        int lastDayTD = daysInMonth + firstDay;

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
                Calendar monthAndYear = Calendar.getInstance();
                monthAndYear.set(Calendar.DAY_OF_MONTH, dayNumber);
                day.setDay(monthAndYear);
                day.setToday(today == dayNumber);
            }
            week.addDay(day);
        }
        return week;
    }

    private int firtDayOfMonth() {
        Calendar calendar = Calendar.getInstance();
        calendar.set(Calendar.DAY_OF_MONTH, 1);
        return calendar.get(Calendar.DAY_OF_WEEK);
    }

    private int numberOfWeeks(int firstDayOfMonth, int daysInMonth) {
        int totalDays = daysInMonth + firstDayOfMonth + 1;
        totalDays += (totalDays % 7);
        return totalDays / 7;
    }

}
