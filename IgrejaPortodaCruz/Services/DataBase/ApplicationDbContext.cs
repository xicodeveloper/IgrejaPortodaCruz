
using Microsoft.EntityFrameworkCore;
using IgrejaPortodaCruz.Services.DataBase.DBEntities;


namespace IgrejaPortodaCruz.Services.DataBase
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) {}


    }
}