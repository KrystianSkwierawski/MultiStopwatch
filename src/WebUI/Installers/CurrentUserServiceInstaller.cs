using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Project.Application.Common.Interfaces;
using Project.WebUI.Services;

namespace Project.WebUI.Installers
{
    public class CurrentUserServiceInstaller : IInstaller
    {
        public void InstallServices(IServiceCollection services, IConfiguration Configuration)
        {
            services.AddSingleton<ICurrentUserService, CurrentUserService>();
        }
    }
}
