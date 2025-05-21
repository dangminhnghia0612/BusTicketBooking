using System;
using System.Collections.Generic;

namespace BusTicketBooking_API.Models;

public partial class Phuongthucthanhtoan
{
    public int MaPhuongthuc { get; set; }

    public string? Ten { get; set; }

    public virtual ICollection<Lichsuthanhtoan> Lichsuthanhtoan { get; set; } = new List<Lichsuthanhtoan>();
}
