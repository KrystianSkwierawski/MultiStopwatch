using Project.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Threading;

namespace Project.Application.Common.Interfaces
{
    public interface IContext
    {
        public DbSet<ApplicationUser> ApplicationUsers { get; set; }
        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}
