using System;
using System.Collections.Generic;

namespace BusTicketBooking_API.Models;

public partial class Tinh
{
    public int MaTinh { get; set; }

    public string? Code { get; set; }

    public string? Ten { get; set; }

    public virtual ICollection<Quan> Quan { get; set; } = new List<Quan>();
}
