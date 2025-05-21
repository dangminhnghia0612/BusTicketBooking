using System;
using System.Collections.Generic;

namespace BusTicketBooking_API.Models;

public partial class Apdungkhuyenmai
{
    public int MaDatve { get; set; }

    public int MaKhuyenmai { get; set; }

    public DateTime? Ngayapdung { get; set; }

    public decimal? SotienKm { get; set; }

    public virtual Datve MaDatveNavigation { get; set; } = null!;

    public virtual Khuyenmai MaKhuyenmaiNavigation { get; set; } = null!;
}
