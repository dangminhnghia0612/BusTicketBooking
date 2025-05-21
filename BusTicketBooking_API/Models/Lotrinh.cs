using System;
using System.Collections.Generic;

namespace BusTicketBooking_API.Models;

public partial class Lotrinh
{
    public int MaLotrinh { get; set; }

    public int MaTuyenxe { get; set; }

    public int MaBenxe { get; set; }

    public bool Labendau { get; set; }

    public bool Labencuoi { get; set; }

    public bool Labentrunggian { get; set; }

    public int Thutu { get; set; }

    public virtual Benxe MaBenxeNavigation { get; set; } = null!;

    public virtual Tuyenxe MaTuyenxeNavigation { get; set; } = null!;
}
