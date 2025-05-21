using System;
using System.Collections.Generic;

namespace BusTicketBooking_API.Models;

public partial class Lydohuydatve
{
    public int MaLydo { get; set; }

    public string? Mota { get; set; }

    public virtual ICollection<Huydatve> Huydatve { get; set; } = new List<Huydatve>();
}
