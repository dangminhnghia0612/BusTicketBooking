using System;
using System.Collections.Generic;

namespace BusTicketBooking.API.Models;

public partial class Huydatve
{
    public int MaHuydatve { get; set; }

    public int MaLydo { get; set; }

    public int? MaQuantrivien { get; set; }

    public int MaChinhsach { get; set; }

    public DateTime? Ngayhuy { get; set; }

    public string? Lydokhac { get; set; }

    public decimal? Tienhoantra { get; set; }

    public virtual ICollection<Datve> Datve { get; set; } = new List<Datve>();

    public virtual Chinhsach MaChinhsachNavigation { get; set; } = null!;

    public virtual Lydohuydatve MaLydoNavigation { get; set; } = null!;

    public virtual Quantrivien? MaQuantrivienNavigation { get; set; }
}
