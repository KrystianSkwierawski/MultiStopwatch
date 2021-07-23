using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace Project.Application.Common.Interfaces
{
    public interface IContext
    {
        public DbSet<StopwatchItem> StopWatchItems { get; set; }
        public DbSet<ProjectItem> ProjectItems { get; set; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}
