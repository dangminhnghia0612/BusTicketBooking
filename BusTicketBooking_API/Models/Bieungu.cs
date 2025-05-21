using System;
using System.Collections.Generic;

namespace BusTicketBooking_API.Models;

public partial class Bieungu
{
    public int MaBieungu { get; set; }

    public int MaQuantrivien { get; set; }

    public string? Tieude { get; set; }

    public string? Anh { get; set; }

    public int? Thutuhienthi { get; set; }

    public bool? Kichhoat { get; set; }

    public DateTime? Ngaybatdau { get; set; }

    public DateTime? Ngayketthuc { get; set; }

    public DateTime? Ngaytao { get; set; }

    public virtual Quantrivien MaQuantrivienNavigation { get; set; } = null!;
}
