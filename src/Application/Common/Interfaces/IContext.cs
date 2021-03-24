using Project.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Threading;
using Domain.Entities;

namespace Project.Application.Common.Interfaces
{
    public interface IContext
    {
        public DbSet<SplittedTime> SplittedTimes { get; set; }
        public DbSet<ApplicationUser> ApplicationUsers { get; set; }
        public DbSet<StopwatchItem> StopWatchItems { get; set; }
        public DbSet<ProjectItem> ProjectItems { get; set; }
        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}
