using IgrejaPortodaCruz.Services.DataBase.DBEntities;
using IgrejaPortodaCruz.Services.DataBase.Repository;

namespace IgrejaPortodaCruz.Services.DataBase
{
    public interface IUnitOfWork : IDisposable
    {

        IDatabaseRepository<TEntity>? GetRepository<TEntity>() where TEntity : DbItem;
        int Commit();
    }
}