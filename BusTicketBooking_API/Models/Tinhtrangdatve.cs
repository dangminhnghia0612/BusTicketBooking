using System;
using System.Collections.Generic;

namespace BusTicketBooking_API.Models;

public partial class Tinhtrangdatve
{
    public int MaTinhtrang { get; set; }

    public string? Ten { get; set; }

    public virtual ICollection<Datve> Datve { get; set; } = new List<Datve>();
}
