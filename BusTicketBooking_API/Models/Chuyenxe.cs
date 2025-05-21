using System;
using System.Collections.Generic;

namespace BusTicketBooking_API.Models;

public partial class Chuyenxe
{
    public int MaChuyenxe { get; set; }

    public int MaTuyenxe { get; set; }

    public int MaXe { get; set; }

    public DateTime? Giodi { get; set; }

    public DateTime? Gioden { get; set; }

    public virtual ICollection<Chitietghe> Chitietghe { get; set; } = new List<Chitietghe>();

    public virtual ICollection<Datve> Datve { get; set; } = new List<Datve>();

    public virtual Tuyenxe MaTuyenxeNavigation { get; set; } = null!;

    public virtual Xe MaXeNavigation { get; set; } = null!;
}
