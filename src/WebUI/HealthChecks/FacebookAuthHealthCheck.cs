using Microsoft.Extensions.Diagnostics.HealthChecks;
using Newtonsoft.Json.Linq;
using Project.Application.Interfaces;
using System.Threading;
using System.Threading.Tasks;

namespace Project.WebUI.Common.HealthChecks
{
    public class FacebookAuthHealthCheck : IHealthCheck
    {
        private readonly IFacebookAuthCheckerService _facebookAuthCheckerService;

        public FacebookAuthHealthCheck(IFacebookAuthCheckerService facebookAuthCheckerService)
        {
            _facebookAuthCheckerService = facebookAuthCheckerService;
        }

        public async Task<HealthCheckResult> CheckHealthAsync(HealthCheckContext context, CancellationToken cancellationToken = default)
        {
            JObject result = await _facebookAuthCheckerService.GetFacebookAuthCheck("test");

            bool healthy = (result["error"]["message"].Value<string>() == "Invalid OAuth access token.") ;

            if (healthy)
                return HealthCheckResult.Healthy(result.ToString());

            return HealthCheckResult.Unhealthy(result.ToString());
        }
    }
}
