using System;
using System.Collections.Generic;

namespace BusTicketBooking.API.Models;

public partial class Tuyenxe
{
    public int MaTuyenxe { get; set; }

    public int MaDiemdi { get; set; }

    public int MaDiemden { get; set; }

    public int? Khoangthoigian { get; set; }

    public decimal? Khoangcach { get; set; }

    public decimal? Giave { get; set; }

    public virtual ICollection<Chuyenxe> Chuyenxe { get; set; } = new List<Chuyenxe>();

    public virtual Benxe MaDiemdenNavigation { get; set; } = null!;

    public virtual Benxe MaDiemdiNavigation { get; set; } = null!;
}
