using System;
using System.Collections.Generic;

namespace BusTicketBooking_API.Models;

public partial class Benxe
{
    public int MaBenxe { get; set; }

    public int? MaQuan { get; set; }

    public string? Tenbenxe { get; set; }

    public string? Diachi { get; set; }

    public string? Sodienthoai { get; set; }

    public virtual ICollection<Lotrinh> Lotrinh { get; set; } = new List<Lotrinh>();

    public virtual Quan? MaQuanNavigation { get; set; }

    public virtual ICollection<Xe> Xe { get; set; } = new List<Xe>();
}
