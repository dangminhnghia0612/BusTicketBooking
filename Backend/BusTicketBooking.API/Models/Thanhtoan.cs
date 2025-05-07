using System;
using System.Collections.Generic;

namespace BusTicketBooking.API.Models;

public partial class Thanhtoan
{
    public int MaThanhtoan { get; set; }

    public int MaPhuongthuc { get; set; }

    public int MaDatve { get; set; }

    public string? MaGiaodich { get; set; }

    public DateTime? Ngaythanhtoan { get; set; }

    public decimal? Sotien { get; set; }

    public string? Ghichu { get; set; }

    public virtual Datve MaDatveNavigation { get; set; } = null!;

    public virtual Phuongthucthanhtoan MaPhuongthucNavigation { get; set; } = null!;
}
