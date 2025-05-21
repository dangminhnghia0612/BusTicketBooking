using System;
using System.Collections.Generic;

namespace BusTicketBooking_API.Models;

public partial class Tintuc
{
    public int MaTintuc { get; set; }

    public int MaQuantrivien { get; set; }

    public string? Tieude { get; set; }

    public string? Noidung { get; set; }

    public string? Anh { get; set; }

    public bool? Duocphathanh { get; set; }

    public DateTime? Ngayphathanh { get; set; }

    public DateTime? Ngaytao { get; set; }

    public DateTime? Ngaycapnhat { get; set; }

    public virtual Quantrivien MaQuantrivienNavigation { get; set; } = null!;
}
