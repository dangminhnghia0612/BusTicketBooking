using System;
using System.Collections.Generic;

namespace BusTicketBooking_API.Models;

public partial class Khuyenmai
{
    public int MaKhuyenmai { get; set; }

    public int MaLoaikhuyenmai { get; set; }

    public int MaQuantrivien { get; set; }

    public string Code { get; set; } = null!;

    public string? Tieude { get; set; }

    public string? Mota { get; set; }

    public decimal? GiatriKm { get; set; }

    public DateTime? Ngaybatdau { get; set; }

    public DateTime? Ngayketthuc { get; set; }

    public decimal? Giatritoithieu { get; set; }

    public decimal? Giamgiatoida { get; set; }

    public bool? Duockichhoat { get; set; }

    public DateTime? Ngaytao { get; set; }

    public virtual ICollection<Apdungkhuyenmai> Apdungkhuyenmai { get; set; } = new List<Apdungkhuyenmai>();

    public virtual Loaikhuyenmai MaLoaikhuyenmaiNavigation { get; set; } = null!;

    public virtual Quantrivien MaQuantrivienNavigation { get; set; } = null!;
}
