using System;
using System.Collections.Generic;

namespace BusTicketBooking_API.Models;

public partial class Vaitro
{
    public int MaVaitro { get; set; }

    public string Ten { get; set; } = null!;

    public string? Mota { get; set; }

    public virtual ICollection<Khachhang> Khachhang { get; set; } = new List<Khachhang>();

    public virtual ICollection<Quantrivien> Quantrivien { get; set; } = new List<Quantrivien>();
}
