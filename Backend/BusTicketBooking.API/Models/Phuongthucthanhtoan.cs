using System;
using System.Collections.Generic;

namespace BusTicketBooking.API.Models;

public partial class Phuongthucthanhtoan
{
    public int MaPhuongthuc { get; set; }

    public string? Ten { get; set; }

    public virtual ICollection<Thanhtoan> Thanhtoan { get; set; } = new List<Thanhtoan>();
}
