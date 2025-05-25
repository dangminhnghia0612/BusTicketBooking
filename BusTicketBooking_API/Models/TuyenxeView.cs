using System;
using System.Collections.Generic;

namespace BusTicketBooking_API.Models;

public partial class TuyenxeView
{
    public int MaTuyenxe { get; set; }

    public int? Khoangthoigian { get; set; }

    public decimal? Khoangcach { get; set; }

    public decimal? Giave { get; set; }

    public int Thutu { get; set; }

    public int MaBenxe { get; set; }

    public string? Tenbenxe { get; set; }

    public int MaTinh { get; set; }

    public string? Tentinh { get; set; }
}
