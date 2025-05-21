using System;
using System.Collections.Generic;

namespace BusTicketBooking_API.Models;

public partial class Tuyenxe
{
    public int MaTuyenxe { get; set; }

    public int? Khoangthoigian { get; set; }

    public decimal? Khoangcach { get; set; }

    public decimal? Giave { get; set; }

    public virtual ICollection<Chuyenxe> Chuyenxe { get; set; } = new List<Chuyenxe>();

    public virtual ICollection<Lotrinh> Lotrinh { get; set; } = new List<Lotrinh>();
}
