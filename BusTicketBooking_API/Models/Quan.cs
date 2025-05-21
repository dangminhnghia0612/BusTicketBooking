using System;
using System.Collections.Generic;

namespace BusTicketBooking_API.Models;

public partial class Quan
{
    public int MaQuan { get; set; }

    public int MaTinh { get; set; }

    public string? Code { get; set; }

    public string? Ten { get; set; }

    public virtual ICollection<Benxe> Benxe { get; set; } = new List<Benxe>();

    public virtual Tinh MaTinhNavigation { get; set; } = null!;
}
