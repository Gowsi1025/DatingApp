using System.ComponentModel.DataAnnotations;

namespace API.entities;

public class Group
{
    [Key]
    public required string Name { get; set; }
    public ICollection<Connection> Connections { get; set; } = [];
}
