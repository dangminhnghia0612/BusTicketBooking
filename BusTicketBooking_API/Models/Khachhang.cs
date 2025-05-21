using System;
using System.Collections.Generic;

namespace BusTicketBooking_API.Models;

public partial class Khachhang
{
    public int MaKhachhang { get; set; }

    public int MaTrangthai { get; set; }

    public int MaVaitro { get; set; }

    public string Sodienthoai { get; set; } = null!;

    public string? Matkhau { get; set; }

    public string? Email { get; set; }

    public string? Hoten { get; set; }

    public string? Token { get; set; }

    public bool? Gioitinh { get; set; }

    public DateTime? Ngaysinh { get; set; }

    public string? Diachi { get; set; }

    public string? Nghenghiep { get; set; }

    public string? Anh { get; set; }

    public string? Ghichu { get; set; }

    public DateTime? Ngaytao { get; set; }

    public DateTime? Ngaycapnhat { get; set; }

    public DateTime? Dangnhapcuoi { get; set; }

    public virtual ICollection<Datve> Datve { get; set; } = new List<Datve>();

    public virtual Trangthaikhachhang MaTrangthaiNavigation { get; set; } = null!;

    public virtual Vaitro MaVaitroNavigation { get; set; } = null!;
}
