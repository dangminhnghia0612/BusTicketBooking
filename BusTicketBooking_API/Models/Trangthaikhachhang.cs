using System;
using System.Collections.Generic;

namespace BusTicketBooking_API.Models;

public partial class Trangthaikhachhang
{
    public int MaTrangthai { get; set; }

    public string? Ten { get; set; }

    public virtual ICollection<Khachhang> Khachhang { get; set; } = new List<Khachhang>();
}
