using BusTicketBooking_API.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BusTicketBooking_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DatveController : ControllerBase
    {
        private readonly QLBanvexeDbContext _context;
        public DatveController(QLBanvexeDbContext context)
        {
            _context = context;
        }
    }
}
