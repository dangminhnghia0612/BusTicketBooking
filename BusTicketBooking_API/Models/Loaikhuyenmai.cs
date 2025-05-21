using System;
using System.Collections.Generic;

namespace BusTicketBooking_API.Models;

public partial class Loaikhuyenmai
{
    public int MaLoaikhuyenmai { get; set; }

    public string? Ten { get; set; }

    public string? Mota { get; set; }

    public virtual ICollection<Khuyenmai> Khuyenmai { get; set; } = new List<Khuyenmai>();
}
