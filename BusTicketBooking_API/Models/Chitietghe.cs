using System;
using System.Collections.Generic;

namespace BusTicketBooking_API.Models;

public partial class Chitietghe
{
    public int MaChitietghe { get; set; }

    public int MaChuyenxe { get; set; }

    public int MaGhe { get; set; }

    public bool Trangthai { get; set; }

    public virtual Chuyenxe MaChuyenxeNavigation { get; set; } = null!;

    public virtual Ghe MaGheNavigation { get; set; } = null!;

    public virtual ICollection<Vexe> Vexe { get; set; } = new List<Vexe>();
}
