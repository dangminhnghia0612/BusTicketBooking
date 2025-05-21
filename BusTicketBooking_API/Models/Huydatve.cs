using System;
using System.Collections.Generic;

namespace BusTicketBooking_API.Models;

public partial class Huydatve
{
    public int MaHuydatve { get; set; }

    public int MaDatve { get; set; }

    public int MaLydo { get; set; }

    public int? MaQuantrivien { get; set; }

    public int MaChinhsach { get; set; }

    public DateTime? Ngayhuy { get; set; }

    public string? Lydokhac { get; set; }

    public decimal? Tienhoantra { get; set; }

    public virtual Chinhsachhuyve MaChinhsachNavigation { get; set; } = null!;

    public virtual Datve MaDatveNavigation { get; set; } = null!;

    public virtual Lydohuydatve MaLydoNavigation { get; set; } = null!;

    public virtual Quantrivien? MaQuantrivienNavigation { get; set; }
}
