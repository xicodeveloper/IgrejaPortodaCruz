using IgrejaPortodaCruz.Services.DataBase.DBEntities;

namespace IgrejaPortodaCruz.Services.DataBase.Repository;

public interface IRepositoryFactory
{
    IDatabaseRepository<TItem> CreateRepository<TItem>() where TItem : DbItem;
}