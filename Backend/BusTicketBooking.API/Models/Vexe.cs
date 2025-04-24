using System;
using System.Collections.Generic;

namespace BusTicketBooking.API.Models;

public partial class Vexe
{
    public int MaVexe { get; set; }

    public int MaChuyenxe { get; set; }

    public int MaDatve { get; set; }

    public int MaGhe { get; set; }

    public decimal? Giave { get; set; }

    public virtual Chuyenxe MaChuyenxeNavigation { get; set; } = null!;

    public virtual Datve MaDatveNavigation { get; set; } = null!;

    public virtual Ghe MaGheNavigation { get; set; } = null!;
}
