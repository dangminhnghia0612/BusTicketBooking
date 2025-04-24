using System;
using System.Collections.Generic;

namespace BusTicketBooking.API.Models;

public partial class Thanhtoan
{
    public int MaThanhtoan { get; set; }

    public int MaPhuongthuc { get; set; }

    public DateTime? Ngaythanhtoan { get; set; }

    public string? Ghichu { get; set; }

    public virtual ICollection<Datve> Datve { get; set; } = new List<Datve>();

    public virtual Phuongthucthanhtoan MaPhuongthucNavigation { get; set; } = null!;
}
