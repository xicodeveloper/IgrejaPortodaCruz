namespace IgrejaPortodaCruz.Services.DataBase.Repository;

using IgrejaPortodaCruz.Services.DataBase.DBEntities;

public interface IDatabaseRepository<TItem> where TItem : DbItem
{
    List<TItem> GetAll();
    TItem? GetById(Guid id);
    void Add(TItem item);
    void Update(TItem item);
    void Delete(TItem item);
    ICollection<TItem>? GetWithQuery(Func<IQueryable<TItem>, IQueryable<TItem>> query);

}