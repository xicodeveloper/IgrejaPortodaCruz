using IgrejaPortodaCruz.Services.Models.Schedule;

namespace IgrejaPortodaCruz.Services;

public class ScheduleService
{
    private readonly List<ScheduleItem> _items = new();
    
    //devolve todos os itens de agendamento começando com a data de inicio
    public IEnumerable<ScheduleItem> GetAll()
    {
        return _items.OrderBy(i => i.StartTime);
    }
    //adiciona evento de agendamento
    public void Add(ScheduleItem item)
    {
        _items.Add(item);
    }

    public ScheduleItem GetByID(Guid id)
    {
        return _items.FirstOrDefault(i => i.Id == id) 
               ?? throw new KeyNotFoundException($"Item with ID {id} not found.");
    }

    public void Remove(Guid id)
    {
        
        var item = GetByID(id);
        if (item != null)
            _items.Remove(item);
    }
}