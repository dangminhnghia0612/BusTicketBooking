using System;
using System.Collections.Generic;

namespace BusTicketBooking_API.Models;

public partial class Thongtinnhaxe
{
    public int MaThongtinnhaxe { get; set; }

    public int MaQuantrivien { get; set; }

    public string? Ten { get; set; }

    public string? Mota { get; set; }

    public DateTime? Ngaytao { get; set; }

    public DateTime? Ngaycapnhat { get; set; }

    public virtual Quantrivien MaQuantrivienNavigation { get; set; } = null!;
}
