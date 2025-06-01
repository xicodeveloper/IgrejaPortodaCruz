using IgrejaPortodaCruz.Services.DataBase.DBEntities;
using Microsoft.EntityFrameworkCore;

namespace IgrejaPortodaCruz.Services.DataBase.Repository;


public class DatabaseRepository<TItem> : IDatabaseRepository<TItem> where TItem : DbItem
{
    private readonly ApplicationDbContext _context;

    public DatabaseRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public List<TItem> GetAll()
    {
        return _context.Set<TItem>().ToList();
    }

    public TItem? GetById(Guid id)
    {
        return _context.Set<TItem>().Find(id);
    }

    public void Add(TItem item)
    {
        _context.Set<TItem>().Add(item);
    }

    public void Update(TItem item)
    {
        var dbSet = _context.Set<TItem>();
        var existingItem = dbSet.Find(item.Id);
        if (existingItem != null)
        {
            _context.Entry(existingItem).CurrentValues.SetValues(item);
        }
        else
        {
            throw new InvalidOperationException("Item não encontrado no banco de dados.");
        }
    }

    public void Delete(TItem item)
    {
        _context.Set<TItem>().Remove(item);
    }

    public ICollection<TItem>? GetWithQuery(Func<IQueryable<TItem>, IQueryable<TItem>> query)
    {
        if (query == null)
            throw new ArgumentNullException(nameof(query));

        var dbSet = _context.Set<TItem>();
        var result = query(dbSet).ToList();
        return result;
    }
}