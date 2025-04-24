using System;
using System.Collections.Generic;

namespace BusTicketBooking.API.Models;

public partial class Loaixe
{
    public int MaLoaixe { get; set; }

    public string? Tenloai { get; set; }

    public int Soghe { get; set; }

    public bool? Nhavesinh { get; set; }

    public string? Sodoghe { get; set; }

    public string? Anh { get; set; }

    public virtual ICollection<Xe> Xe { get; set; } = new List<Xe>();
}
