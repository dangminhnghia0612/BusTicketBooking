using System;
using System.Collections.Generic;

namespace BusTicketBooking_API.Models;

public partial class Xe
{
    public int MaXe { get; set; }

    public int MaLoaixe { get; set; }

    public int MaBenxe { get; set; }

    public string Bienso { get; set; } = null!;

    public string? Ten { get; set; }

    public virtual ICollection<Chuyenxe> Chuyenxe { get; set; } = new List<Chuyenxe>();

    public virtual ICollection<Ghe> Ghe { get; set; } = new List<Ghe>();

    public virtual Benxe MaBenxeNavigation { get; set; } = null!;

    public virtual Loaixe MaLoaixeNavigation { get; set; } = null!;
}
