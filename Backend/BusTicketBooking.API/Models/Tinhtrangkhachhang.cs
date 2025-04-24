using System;
using System.Collections.Generic;

namespace BusTicketBooking.API.Models;

public partial class Tinhtrangkhachhang
{
    public int MaTinhtrang { get; set; }

    public string? Ten { get; set; }

    public virtual ICollection<Khachhang> Khachhang { get; set; } = new List<Khachhang>();
}
