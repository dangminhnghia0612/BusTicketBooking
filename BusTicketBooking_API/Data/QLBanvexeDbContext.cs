using System;
using System.Collections.Generic;
using BusTicketBooking_API.Models;
using Microsoft.EntityFrameworkCore;

namespace BusTicketBooking_API.Data;

public partial class QLBanvexeDbContext : DbContext
{
    public QLBanvexeDbContext()
    {
    }

    public QLBanvexeDbContext(DbContextOptions<QLBanvexeDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Apdungkhuyenmai> Apdungkhuyenmai { get; set; }

    public virtual DbSet<Benxe> Benxe { get; set; }

    public virtual DbSet<Bieungu> Bieungu { get; set; }

    public virtual DbSet<Chinhsachhuyve> Chinhsachhuyve { get; set; }

    public virtual DbSet<Chitietghe> Chitietghe { get; set; }

    public virtual DbSet<Chuyenxe> Chuyenxe { get; set; }

    public virtual DbSet<Datve> Datve { get; set; }

    public virtual DbSet<Ghe> Ghe { get; set; }

    public virtual DbSet<Huydatve> Huydatve { get; set; }

    public virtual DbSet<Khachhang> Khachhang { get; set; }

    public virtual DbSet<Khuyenmai> Khuyenmai { get; set; }

    public virtual DbSet<Lichsuthanhtoan> Lichsuthanhtoan { get; set; }

    public virtual DbSet<Loaikhuyenmai> Loaikhuyenmai { get; set; }

    public virtual DbSet<Loaixe> Loaixe { get; set; }

    public virtual DbSet<Lotrinh> Lotrinh { get; set; }

    public virtual DbSet<Lydohuydatve> Lydohuydatve { get; set; }

    public virtual DbSet<Phuongthucthanhtoan> Phuongthucthanhtoan { get; set; }

    public virtual DbSet<Quan> Quan { get; set; }

    public virtual DbSet<Quantrivien> Quantrivien { get; set; }

    public virtual DbSet<Thongtinnhaxe> Thongtinnhaxe { get; set; }

    public virtual DbSet<Tinh> Tinh { get; set; }

    public virtual DbSet<Tinhtrangdatve> Tinhtrangdatve { get; set; }

    public virtual DbSet<Tintuc> Tintuc { get; set; }

    public virtual DbSet<Trangthaikhachhang> Trangthaikhachhang { get; set; }

    public virtual DbSet<Tuyenxe> Tuyenxe { get; set; }

    public virtual DbSet<Vaitro> Vaitro { get; set; }

    public virtual DbSet<Vexe> Vexe { get; set; }

    public virtual DbSet<Xe> Xe { get; set; }

//    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
//#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
//        => optionsBuilder.UseSqlServer("Data Source=MinhNghia;Initial Catalog=QLBanVeXe;Persist Security Info=True;User ID=sa;Password=123456;Trust Server Certificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Apdungkhuyenmai>(entity =>
        {
            entity.HasKey(e => new { e.MaDatve, e.MaKhuyenmai });

            entity.Property(e => e.MaDatve).HasColumnName("Ma_Datve");
            entity.Property(e => e.MaKhuyenmai).HasColumnName("Ma_Khuyenmai");
            entity.Property(e => e.Ngayapdung).HasColumnType("datetime");
            entity.Property(e => e.SotienKm)
                .HasColumnType("decimal(18, 0)")
                .HasColumnName("SotienKM");

            entity.HasOne(d => d.MaDatveNavigation).WithMany(p => p.Apdungkhuyenmai)
                .HasForeignKey(d => d.MaDatve)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Datve");

            entity.HasOne(d => d.MaKhuyenmaiNavigation).WithMany(p => p.Apdungkhuyenmai)
                .HasForeignKey(d => d.MaKhuyenmai)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Khuyenmai");
        });

        modelBuilder.Entity<Benxe>(entity =>
        {
            entity.HasKey(e => e.MaBenxe);

            entity.HasIndex(e => e.MaQuan, "Benxe_Quan_FK");

            entity.Property(e => e.MaBenxe).HasColumnName("Ma_Benxe");
            entity.Property(e => e.Diachi).HasMaxLength(100);
            entity.Property(e => e.MaQuan).HasColumnName("Ma_Quan");
            entity.Property(e => e.Sodienthoai).HasMaxLength(20);
            entity.Property(e => e.Tenbenxe).HasMaxLength(50);

            entity.HasOne(d => d.MaQuanNavigation).WithMany(p => p.Benxe)
                .HasForeignKey(d => d.MaQuan)
                .HasConstraintName("FK_Benxe_Quan");
        });

        modelBuilder.Entity<Bieungu>(entity =>
        {
            entity.HasKey(e => e.MaBieungu);

            entity.Property(e => e.MaBieungu).HasColumnName("Ma_Bieungu");
            entity.Property(e => e.Anh).HasMaxLength(100);
            entity.Property(e => e.MaQuantrivien).HasColumnName("Ma_Quantrivien");
            entity.Property(e => e.Ngaybatdau).HasColumnType("datetime");
            entity.Property(e => e.Ngayketthuc).HasColumnType("datetime");
            entity.Property(e => e.Ngaytao).HasColumnType("datetime");
            entity.Property(e => e.Tieude).HasMaxLength(100);

            entity.HasOne(d => d.MaQuantrivienNavigation).WithMany(p => p.Bieungu)
                .HasForeignKey(d => d.MaQuantrivien)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Bieungu_Quantrivien");
        });

        modelBuilder.Entity<Chinhsachhuyve>(entity =>
        {
            entity.HasKey(e => e.MaChinhsach).HasName("PK_Chinhsach");

            entity.Property(e => e.MaChinhsach).HasColumnName("Ma_Chinhsach");
            entity.Property(e => e.MaQuantrivien).HasColumnName("Ma_Quantrivien");
            entity.Property(e => e.Mota).HasMaxLength(100);
            entity.Property(e => e.Ngaycapnhat).HasColumnType("datetime");
            entity.Property(e => e.Ngaytao).HasColumnType("datetime");
            entity.Property(e => e.Phantram).HasColumnType("decimal(18, 0)");
            entity.Property(e => e.Ten).HasMaxLength(50);

            entity.HasOne(d => d.MaQuantrivienNavigation).WithMany(p => p.Chinhsachhuyve)
                .HasForeignKey(d => d.MaQuantrivien)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Chinhsach_Quantrivien");
        });

        modelBuilder.Entity<Chitietghe>(entity =>
        {
            entity.HasKey(e => e.MaChitietghe);

            entity.HasIndex(e => e.MaChuyenxe, "Chuyenxe_Chitietghe_FK");

            entity.HasIndex(e => e.MaGhe, "Ghe_Chitietghe_FK");

            entity.HasIndex(e => new { e.MaChuyenxe, e.MaGhe }, "UQ_Chitietghe").IsUnique();

            entity.Property(e => e.MaChitietghe).HasColumnName("Ma_Chitietghe");
            entity.Property(e => e.MaChuyenxe).HasColumnName("Ma_Chuyenxe");
            entity.Property(e => e.MaGhe).HasColumnName("Ma_Ghe");

            entity.HasOne(d => d.MaChuyenxeNavigation).WithMany(p => p.Chitietghe)
                .HasForeignKey(d => d.MaChuyenxe)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Chitietghe_Chuyenxe");

            entity.HasOne(d => d.MaGheNavigation).WithMany(p => p.Chitietghe)
                .HasForeignKey(d => d.MaGhe)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Chitietghe_Ghe");
        });

        modelBuilder.Entity<Chuyenxe>(entity =>
        {
            entity.HasKey(e => e.MaChuyenxe);

            entity.ToTable(tb => tb.HasTrigger("tg_Chuyenxe_ThemChitietghe"));

            entity.HasIndex(e => e.MaTuyenxe, "Chuyenxe_Tuyenxe_FK");

            entity.HasIndex(e => e.MaXe, "Chuyenxe_Xe_FK");

            entity.Property(e => e.MaChuyenxe).HasColumnName("Ma_Chuyenxe");
            entity.Property(e => e.Gioden).HasColumnType("datetime");
            entity.Property(e => e.Giodi).HasColumnType("datetime");
            entity.Property(e => e.MaTuyenxe).HasColumnName("Ma_Tuyenxe");
            entity.Property(e => e.MaXe).HasColumnName("Ma_Xe");

            entity.HasOne(d => d.MaTuyenxeNavigation).WithMany(p => p.Chuyenxe)
                .HasForeignKey(d => d.MaTuyenxe)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Chuyenxe_Tuyenxe");

            entity.HasOne(d => d.MaXeNavigation).WithMany(p => p.Chuyenxe)
                .HasForeignKey(d => d.MaXe)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Chuyenxe_Xe");
        });

        modelBuilder.Entity<Datve>(entity =>
        {
            entity.HasKey(e => e.MaDatve);

            entity.HasIndex(e => e.MaChuyenxe, "Datve_Chuyenxe_FK");

            entity.HasIndex(e => e.MaTinhtrang, "Datve_Co_TinhTrangDat_FK");

            entity.HasIndex(e => e.MaKhachhang, "Khachang_Datve_FK");

            entity.Property(e => e.MaDatve).HasColumnName("Ma_Datve");
            entity.Property(e => e.Dadoive).HasDefaultValue(false);
            entity.Property(e => e.Email).HasMaxLength(50);
            entity.Property(e => e.Ghichu).HasMaxLength(100);
            entity.Property(e => e.Giagoc).HasColumnType("decimal(18, 0)");
            entity.Property(e => e.Giasaukhuyenmai).HasColumnType("decimal(18, 0)");
            entity.Property(e => e.MaChuyenxe).HasColumnName("Ma_Chuyenxe");
            entity.Property(e => e.MaKhachhang).HasColumnName("Ma_Khachhang");
            entity.Property(e => e.MaTinhtrang).HasColumnName("Ma_Tinhtrang");
            entity.Property(e => e.Ngaydat).HasColumnType("datetime");
            entity.Property(e => e.Sodienthoai).HasMaxLength(15);
            entity.Property(e => e.Tenkhachhang).HasMaxLength(50);

            entity.HasOne(d => d.MaChuyenxeNavigation).WithMany(p => p.Datve)
                .HasForeignKey(d => d.MaChuyenxe)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Datve_Chuyenxe");

            entity.HasOne(d => d.MaKhachhangNavigation).WithMany(p => p.Datve)
                .HasForeignKey(d => d.MaKhachhang)
                .HasConstraintName("FK_Datve_Khachhang");

            entity.HasOne(d => d.MaTinhtrangNavigation).WithMany(p => p.Datve)
                .HasForeignKey(d => d.MaTinhtrang)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Datve_Tinhtrangdatve");
        });

        modelBuilder.Entity<Ghe>(entity =>
        {
            entity.HasKey(e => e.MaGhe);

            entity.HasIndex(e => e.MaXe, "Xe_Ghe_FK");

            entity.Property(e => e.MaGhe).HasColumnName("Ma_Ghe");
            entity.Property(e => e.MaXe).HasColumnName("Ma_Xe");
            entity.Property(e => e.Soghe).HasMaxLength(10);

            entity.HasOne(d => d.MaXeNavigation).WithMany(p => p.Ghe)
                .HasForeignKey(d => d.MaXe)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Xe_Ghe");
        });

        modelBuilder.Entity<Huydatve>(entity =>
        {
            entity.HasKey(e => e.MaHuydatve);

            entity.HasIndex(e => e.MaDatve, "Datve_Huydatve_FK");

            entity.Property(e => e.MaHuydatve).HasColumnName("Ma_Huydatve");
            entity.Property(e => e.Lydokhac).HasMaxLength(100);
            entity.Property(e => e.MaChinhsach).HasColumnName("Ma_Chinhsach");
            entity.Property(e => e.MaDatve).HasColumnName("Ma_Datve");
            entity.Property(e => e.MaLydo).HasColumnName("Ma_Lydo");
            entity.Property(e => e.MaQuantrivien).HasColumnName("Ma_Quantrivien");
            entity.Property(e => e.Ngayhuy).HasColumnType("datetime");
            entity.Property(e => e.Tienhoantra).HasColumnType("decimal(18, 0)");

            entity.HasOne(d => d.MaChinhsachNavigation).WithMany(p => p.Huydatve)
                .HasForeignKey(d => d.MaChinhsach)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Chinhsach_Huyve");

            entity.HasOne(d => d.MaDatveNavigation).WithMany(p => p.Huydatve)
                .HasForeignKey(d => d.MaDatve)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Datve_Huyve");

            entity.HasOne(d => d.MaLydoNavigation).WithMany(p => p.Huydatve)
                .HasForeignKey(d => d.MaLydo)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Huydatve_Lydo");

            entity.HasOne(d => d.MaQuantrivienNavigation).WithMany(p => p.Huydatve)
                .HasForeignKey(d => d.MaQuantrivien)
                .HasConstraintName("FK_Huydatve_Quantrivien");
        });

        modelBuilder.Entity<Khachhang>(entity =>
        {
            entity.HasKey(e => e.MaKhachhang);

            entity.HasIndex(e => e.MaVaitro, "Khachhang_Vaitro_FK");

            entity.HasIndex(e => e.MaTrangthai, "Trangthai_Khachhang_FK");

            entity.Property(e => e.MaKhachhang).HasColumnName("Ma_Khachhang");
            entity.Property(e => e.Anh)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Dangnhapcuoi).HasColumnType("datetime");
            entity.Property(e => e.Diachi).HasMaxLength(100);
            entity.Property(e => e.Email).HasMaxLength(50);
            entity.Property(e => e.Ghichu).HasMaxLength(100);
            entity.Property(e => e.Hoten).HasMaxLength(100);
            entity.Property(e => e.MaTrangthai).HasColumnName("Ma_Trangthai");
            entity.Property(e => e.MaVaitro).HasColumnName("Ma_Vaitro");
            entity.Property(e => e.Matkhau).HasMaxLength(255);
            entity.Property(e => e.Ngaycapnhat).HasColumnType("datetime");
            entity.Property(e => e.Ngaysinh).HasColumnType("datetime");
            entity.Property(e => e.Ngaytao).HasColumnType("datetime");
            entity.Property(e => e.Nghenghiep).HasMaxLength(50);
            entity.Property(e => e.Sodienthoai).HasMaxLength(15);
            entity.Property(e => e.Token).HasMaxLength(200);

            entity.HasOne(d => d.MaTrangthaiNavigation).WithMany(p => p.Khachhang)
                .HasForeignKey(d => d.MaTrangthai)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TrangthaiKhachHang");

            entity.HasOne(d => d.MaVaitroNavigation).WithMany(p => p.Khachhang)
                .HasForeignKey(d => d.MaVaitro)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Khachhang_Vaitro");
        });

        modelBuilder.Entity<Khuyenmai>(entity =>
        {
            entity.HasKey(e => e.MaKhuyenmai).HasName("PK_PROMOTIONS");

            entity.HasIndex(e => e.Code, "UQ_CODE").IsUnique();

            entity.Property(e => e.MaKhuyenmai).HasColumnName("Ma_Khuyenmai");
            entity.Property(e => e.Code).HasMaxLength(20);
            entity.Property(e => e.Giamgiatoida).HasColumnType("decimal(18, 0)");
            entity.Property(e => e.GiatriKm)
                .HasColumnType("decimal(18, 0)")
                .HasColumnName("GiatriKM");
            entity.Property(e => e.Giatritoithieu).HasColumnType("decimal(18, 0)");
            entity.Property(e => e.MaLoaikhuyenmai).HasColumnName("Ma_Loaikhuyenmai");
            entity.Property(e => e.MaQuantrivien).HasColumnName("Ma_Quantrivien");
            entity.Property(e => e.Mota).HasMaxLength(200);
            entity.Property(e => e.Ngaybatdau).HasColumnType("datetime");
            entity.Property(e => e.Ngayketthuc).HasColumnType("datetime");
            entity.Property(e => e.Ngaytao).HasColumnType("datetime");
            entity.Property(e => e.Tieude).HasMaxLength(100);

            entity.HasOne(d => d.MaLoaikhuyenmaiNavigation).WithMany(p => p.Khuyenmai)
                .HasForeignKey(d => d.MaLoaikhuyenmai)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_LoaiKM");

            entity.HasOne(d => d.MaQuantrivienNavigation).WithMany(p => p.Khuyenmai)
                .HasForeignKey(d => d.MaQuantrivien)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TaoKhuyenMai");
        });

        modelBuilder.Entity<Lichsuthanhtoan>(entity =>
        {
            entity.HasKey(e => e.MaThanhtoan);

            entity.HasIndex(e => e.MaPhuongthuc, "PhuongThucThanhToan_FK");

            entity.HasIndex(e => e.MaDatve, "Thanhtoan_Datve_FK");

            entity.Property(e => e.MaThanhtoan).HasColumnName("Ma_Thanhtoan");
            entity.Property(e => e.Ghichu).HasMaxLength(100);
            entity.Property(e => e.MaDatve).HasColumnName("Ma_Datve");
            entity.Property(e => e.MaGiaodich)
                .HasMaxLength(50)
                .HasColumnName("Ma_Giaodich");
            entity.Property(e => e.MaPhuongthuc).HasColumnName("Ma_Phuongthuc");
            entity.Property(e => e.Ngaythanhtoan).HasColumnType("datetime");
            entity.Property(e => e.Sotien).HasColumnType("decimal(18, 0)");

            entity.HasOne(d => d.MaDatveNavigation).WithMany(p => p.Lichsuthanhtoan)
                .HasForeignKey(d => d.MaDatve)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Datve_Thanhtoan");

            entity.HasOne(d => d.MaPhuongthucNavigation).WithMany(p => p.Lichsuthanhtoan)
                .HasForeignKey(d => d.MaPhuongthuc)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Phuongthuc_Thanhtoan");
        });

        modelBuilder.Entity<Loaikhuyenmai>(entity =>
        {
            entity.HasKey(e => e.MaLoaikhuyenmai);

            entity.Property(e => e.MaLoaikhuyenmai).HasColumnName("Ma_Loaikhuyenmai");
            entity.Property(e => e.Mota).HasMaxLength(100);
            entity.Property(e => e.Ten).HasMaxLength(50);
        });

        modelBuilder.Entity<Loaixe>(entity =>
        {
            entity.HasKey(e => e.MaLoaixe);

            entity.Property(e => e.MaLoaixe).HasColumnName("Ma_Loaixe");
            entity.Property(e => e.Anh).HasMaxLength(100);
            entity.Property(e => e.Tenloai).HasMaxLength(50);
        });

        modelBuilder.Entity<Lotrinh>(entity =>
        {
            entity.HasKey(e => e.MaLotrinh);

            entity.HasIndex(e => e.MaBenxe, "Lotrinh_Benxe_FK");

            entity.HasIndex(e => e.MaTuyenxe, "Lotrinh_Tuyenxe_FK");

            entity.Property(e => e.MaLotrinh).HasColumnName("Ma_Lotrinh");
            entity.Property(e => e.MaBenxe).HasColumnName("Ma_Benxe");
            entity.Property(e => e.MaTuyenxe).HasColumnName("Ma_Tuyenxe");

            entity.HasOne(d => d.MaBenxeNavigation).WithMany(p => p.Lotrinh)
                .HasForeignKey(d => d.MaBenxe)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Benxe_Lotrinh");

            entity.HasOne(d => d.MaTuyenxeNavigation).WithMany(p => p.Lotrinh)
                .HasForeignKey(d => d.MaTuyenxe)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Tuyenxe_Lotrinh");
        });

        modelBuilder.Entity<Lydohuydatve>(entity =>
        {
            entity.HasKey(e => e.MaLydo);

            entity.Property(e => e.MaLydo).HasColumnName("Ma_Lydo");
            entity.Property(e => e.Mota).HasMaxLength(100);
        });

        modelBuilder.Entity<Phuongthucthanhtoan>(entity =>
        {
            entity.HasKey(e => e.MaPhuongthuc);

            entity.Property(e => e.MaPhuongthuc).HasColumnName("Ma_Phuongthuc");
            entity.Property(e => e.Ten).HasMaxLength(50);
        });

        modelBuilder.Entity<Quan>(entity =>
        {
            entity.HasKey(e => e.MaQuan);

            entity.HasIndex(e => e.MaTinh, "Tinh_Quan_FK");

            entity.Property(e => e.MaQuan)
                .ValueGeneratedNever()
                .HasColumnName("Ma_Quan");
            entity.Property(e => e.Code).HasMaxLength(50);
            entity.Property(e => e.MaTinh).HasColumnName("Ma_Tinh");
            entity.Property(e => e.Ten).HasMaxLength(50);

            entity.HasOne(d => d.MaTinhNavigation).WithMany(p => p.Quan)
                .HasForeignKey(d => d.MaTinh)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Quan_Tinh");
        });

        modelBuilder.Entity<Quantrivien>(entity =>
        {
            entity.HasKey(e => e.MaQuantrivien);

            entity.HasIndex(e => e.MaVaitro, "Quantrivien_Vaitro_FK");

            entity.Property(e => e.MaQuantrivien).HasColumnName("Ma_Quantrivien");
            entity.Property(e => e.Anh).HasMaxLength(100);
            entity.Property(e => e.Hoten).HasMaxLength(50);
            entity.Property(e => e.MaVaitro).HasColumnName("Ma_Vaitro");
            entity.Property(e => e.Matkhau).HasMaxLength(255);
            entity.Property(e => e.Ngaycapnhat).HasColumnType("datetime");
            entity.Property(e => e.Ngaytao).HasColumnType("datetime");
            entity.Property(e => e.Sodienthoai).HasMaxLength(15);
            entity.Property(e => e.Tendangnhap).HasMaxLength(50);

            entity.HasOne(d => d.MaVaitroNavigation).WithMany(p => p.Quantrivien)
                .HasForeignKey(d => d.MaVaitro)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Quantrivien_Vaitro");
        });

        modelBuilder.Entity<Thongtinnhaxe>(entity =>
        {
            entity.HasKey(e => e.MaThongtinnhaxe);

            entity.Property(e => e.MaThongtinnhaxe).HasColumnName("Ma_Thongtinnhaxe");
            entity.Property(e => e.MaQuantrivien).HasColumnName("Ma_Quantrivien");
            entity.Property(e => e.Mota).HasMaxLength(200);
            entity.Property(e => e.Ngaycapnhat).HasColumnType("datetime");
            entity.Property(e => e.Ngaytao).HasColumnType("datetime");
            entity.Property(e => e.Ten).HasMaxLength(100);

            entity.HasOne(d => d.MaQuantrivienNavigation).WithMany(p => p.Thongtinnhaxe)
                .HasForeignKey(d => d.MaQuantrivien)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Thongtinnhaxe_Quantrivien");
        });

        modelBuilder.Entity<Tinh>(entity =>
        {
            entity.HasKey(e => e.MaTinh);

            entity.Property(e => e.MaTinh)
                .ValueGeneratedNever()
                .HasColumnName("Ma_Tinh");
            entity.Property(e => e.Code).HasMaxLength(50);
            entity.Property(e => e.Ten).HasMaxLength(50);
        });

        modelBuilder.Entity<Tinhtrangdatve>(entity =>
        {
            entity.HasKey(e => e.MaTinhtrang).HasName("PK_Tinhtrang");

            entity.Property(e => e.MaTinhtrang).HasColumnName("Ma_Tinhtrang");
            entity.Property(e => e.Ten).HasMaxLength(50);
        });

        modelBuilder.Entity<Tintuc>(entity =>
        {
            entity.HasKey(e => e.MaTintuc);

            entity.Property(e => e.MaTintuc).HasColumnName("Ma_Tintuc");
            entity.Property(e => e.Anh)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.MaQuantrivien).HasColumnName("Ma_Quantrivien");
            entity.Property(e => e.Ngaycapnhat).HasColumnType("datetime");
            entity.Property(e => e.Ngayphathanh).HasColumnType("datetime");
            entity.Property(e => e.Ngaytao).HasColumnType("datetime");

            entity.HasOne(d => d.MaQuantrivienNavigation).WithMany(p => p.Tintuc)
                .HasForeignKey(d => d.MaQuantrivien)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Quantrivien_Tintuc");
        });

        modelBuilder.Entity<Trangthaikhachhang>(entity =>
        {
            entity.HasKey(e => e.MaTrangthai).HasName("PK_Tinhtrangkhachhang");

            entity.Property(e => e.MaTrangthai).HasColumnName("Ma_Trangthai");
            entity.Property(e => e.Ten).HasMaxLength(50);
        });

        modelBuilder.Entity<Tuyenxe>(entity =>
        {
            entity.HasKey(e => e.MaTuyenxe);

            entity.Property(e => e.MaTuyenxe).HasColumnName("Ma_Tuyenxe");
            entity.Property(e => e.Giave).HasColumnType("decimal(18, 0)");
            entity.Property(e => e.Khoangcach).HasColumnType("decimal(18, 0)");
        });

        modelBuilder.Entity<Vaitro>(entity =>
        {
            entity.HasKey(e => e.MaVaitro);

            entity.Property(e => e.MaVaitro).HasColumnName("Ma_Vaitro");
            entity.Property(e => e.Mota).HasMaxLength(100);
            entity.Property(e => e.Ten).HasMaxLength(50);
        });

        modelBuilder.Entity<Vexe>(entity =>
        {
            entity.HasKey(e => e.MaVexe);

            entity.HasIndex(e => e.MaChitietghe, "Vexe_Chitietghe_FK");

            entity.HasIndex(e => e.MaDatve, "Vexe_Datve_FK");

            entity.Property(e => e.MaVexe).HasColumnName("Ma_Vexe");
            entity.Property(e => e.Giave).HasColumnType("decimal(18, 0)");
            entity.Property(e => e.MaChitietghe).HasColumnName("Ma_Chitietghe");
            entity.Property(e => e.MaDatve).HasColumnName("Ma_Datve");

            entity.HasOne(d => d.MaChitietgheNavigation).WithMany(p => p.Vexe)
                .HasForeignKey(d => d.MaChitietghe)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Vexe_Chitietghe");

            entity.HasOne(d => d.MaDatveNavigation).WithMany(p => p.Vexe)
                .HasForeignKey(d => d.MaDatve)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Datvexe");
        });

        modelBuilder.Entity<Xe>(entity =>
        {
            entity.HasKey(e => e.MaXe);

            entity.ToTable(tb => tb.HasTrigger("tg_ThemGheTuDong"));

            entity.HasIndex(e => e.MaLoaixe, "Xe_Loaixe_FK");

            entity.Property(e => e.MaXe).HasColumnName("Ma_Xe");
            entity.Property(e => e.Bienso).HasMaxLength(20);
            entity.Property(e => e.MaBenxe).HasColumnName("Ma_Benxe");
            entity.Property(e => e.MaLoaixe).HasColumnName("Ma_Loaixe");
            entity.Property(e => e.Ten).HasMaxLength(50);

            entity.HasOne(d => d.MaBenxeNavigation).WithMany(p => p.Xe)
                .HasForeignKey(d => d.MaBenxe)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Xe_Benxe");

            entity.HasOne(d => d.MaLoaixeNavigation).WithMany(p => p.Xe)
                .HasForeignKey(d => d.MaLoaixe)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Xe_Loaixe");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
