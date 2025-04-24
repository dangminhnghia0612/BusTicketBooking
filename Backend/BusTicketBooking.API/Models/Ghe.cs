using System;
using System.Collections.Generic;

namespace BusTicketBooking.API.Models;

public partial class Ghe
{
    public int MaGhe { get; set; }

    public int MaXe { get; set; }

    public string? Soghe { get; set; }

    public int? Tang { get; set; }

    public int? Day { get; set; }

    public bool? Trangthai { get; set; }

    public virtual Xe MaXeNavigation { get; set; } = null!;

    public virtual ICollection<Vexe> Vexe { get; set; } = new List<Vexe>();
}
