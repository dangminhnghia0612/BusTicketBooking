using System;
using System.Collections.Generic;

namespace BusTicketBooking_API.Models;

public partial class Ghe
{
    public int MaGhe { get; set; }

    public int MaXe { get; set; }

    public string? Soghe { get; set; }

    public int? Tang { get; set; }

    public int? Day { get; set; }

    public virtual ICollection<Chitietghe> Chitietghe { get; set; } = new List<Chitietghe>();

    public virtual Xe MaXeNavigation { get; set; } = null!;
}
