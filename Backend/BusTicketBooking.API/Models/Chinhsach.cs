using System;
using System.Collections.Generic;

namespace BusTicketBooking.API.Models;

public partial class Chinhsach
{
    public int MaChinhsach { get; set; }

    public string? Ten { get; set; }

    public string? Mota { get; set; }

    public int? Sogiotruockhoihanh { get; set; }

    public decimal? Phantram { get; set; }

    public bool? Kichhoat { get; set; }

    public DateTime? Ngaytao { get; set; }

    public DateTime? Ngaycapnhat { get; set; }

    public virtual ICollection<Huydatve> Huydatve { get; set; } = new List<Huydatve>();
}
