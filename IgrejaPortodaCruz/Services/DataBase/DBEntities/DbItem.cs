using System.ComponentModel.DataAnnotations;

namespace IgrejaPortodaCruz.Services.DataBase.DBEntities;

public abstract class DbItem
{
    [Key]
    public Guid Id { get; set; }
}