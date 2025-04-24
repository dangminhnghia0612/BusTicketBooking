using System;
using System.Collections.Generic;

namespace BusTicketBooking.API.Models;

public partial class Benxe
{
    public int MaBenxe { get; set; }

    public int? MaQuan { get; set; }

    public string? Tenbenxe { get; set; }

    public string? Diachi { get; set; }

    public string? Sodienthoai { get; set; }

    public virtual Quan? MaQuanNavigation { get; set; }

    public virtual ICollection<Tuyenxe> TuyenxeMaDiemdenNavigation { get; set; } = new List<Tuyenxe>();

    public virtual ICollection<Tuyenxe> TuyenxeMaDiemdiNavigation { get; set; } = new List<Tuyenxe>();
}
