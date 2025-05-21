using System;
using System.Collections.Generic;

namespace BusTicketBooking_API.Models;

public partial class Vexe
{
    public int MaVexe { get; set; }

    public int MaDatve { get; set; }

    public int MaChitietghe { get; set; }

    public decimal Giave { get; set; }

    public virtual Chitietghe MaChitietgheNavigation { get; set; } = null!;

    public virtual Datve MaDatveNavigation { get; set; } = null!;
}
