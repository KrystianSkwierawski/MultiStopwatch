using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Project.Infrastructure.Persistence;
using Project.WebUI.Common.HealthChecks;

namespace Project.WebUI.Installers
{
    public class HealthChecksInstaller : IInstaller
    {
        public void InstallServices(IServiceCollection services, IConfiguration Configuration)
        {
            services.AddHealthChecks()
              .AddDbContextCheck<Context>()
              .AddCheck<FacebookAuthHealthCheck>("API checking a facebook user token");
        }
    }
}
