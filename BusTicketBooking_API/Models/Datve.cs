using System;
using System.Collections.Generic;

namespace BusTicketBooking_API.Models;

public partial class Datve
{
    public int MaDatve { get; set; }

    public int MaChuyenxe { get; set; }

    public int? MaKhachhang { get; set; }

    public int MaTinhtrang { get; set; }

    public DateTime Ngaydat { get; set; }

    public int Soluong { get; set; }

    public decimal? Giagoc { get; set; }

    public decimal? Giasaukhuyenmai { get; set; }

    public bool? Dadoive { get; set; }

    public string? Ghichu { get; set; }

    public string? Tenkhachhang { get; set; }

    public string? Sodienthoai { get; set; }

    public string? Email { get; set; }

    public virtual ICollection<Apdungkhuyenmai> Apdungkhuyenmai { get; set; } = new List<Apdungkhuyenmai>();

    public virtual ICollection<Huydatve> Huydatve { get; set; } = new List<Huydatve>();

    public virtual ICollection<Lichsuthanhtoan> Lichsuthanhtoan { get; set; } = new List<Lichsuthanhtoan>();

    public virtual Chuyenxe MaChuyenxeNavigation { get; set; } = null!;

    public virtual Khachhang? MaKhachhangNavigation { get; set; }

    public virtual Tinhtrangdatve MaTinhtrangNavigation { get; set; } = null!;

    public virtual ICollection<Vexe> Vexe { get; set; } = new List<Vexe>();
}
