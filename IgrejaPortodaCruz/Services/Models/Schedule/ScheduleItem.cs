namespace IgrejaPortodaCruz.Services.Models.Schedule;
public class ScheduleItem
{
  
    public Guid Id { get; set; } = Guid.NewGuid();
    
    public DateTime StartTime { get; set; }
    
    public DateTime EndTime { get; set; }
    
    public string Title { get; set; }
    
    public string Description { get; set; }
}