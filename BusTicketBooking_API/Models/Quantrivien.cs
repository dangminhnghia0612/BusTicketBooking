using System;
using System.Collections.Generic;

namespace BusTicketBooking_API.Models;

public partial class Quantrivien
{
    public int MaQuantrivien { get; set; }

    public int MaVaitro { get; set; }

    public string Tendangnhap { get; set; } = null!;

    public string? Matkhau { get; set; }

    public string Sodienthoai { get; set; } = null!;

    public string? Hoten { get; set; }

    public string? Anh { get; set; }

    public DateTime? Ngaytao { get; set; }

    public DateTime? Ngaycapnhat { get; set; }

    public virtual ICollection<Bieungu> Bieungu { get; set; } = new List<Bieungu>();

    public virtual ICollection<Chinhsachhuyve> Chinhsachhuyve { get; set; } = new List<Chinhsachhuyve>();

    public virtual ICollection<Huydatve> Huydatve { get; set; } = new List<Huydatve>();

    public virtual ICollection<Khuyenmai> Khuyenmai { get; set; } = new List<Khuyenmai>();

    public virtual Vaitro MaVaitroNavigation { get; set; } = null!;

    public virtual ICollection<Thongtinnhaxe> Thongtinnhaxe { get; set; } = new List<Thongtinnhaxe>();

    public virtual ICollection<Tintuc> Tintuc { get; set; } = new List<Tintuc>();
}
