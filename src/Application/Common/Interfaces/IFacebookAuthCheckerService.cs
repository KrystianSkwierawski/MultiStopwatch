using Newtonsoft.Json.Linq;
using System.Threading.Tasks;

namespace Project.Application.Interfaces
{
    public interface IFacebookAuthCheckerService
    {
        Task<JObject> GetFacebookAuthCheck(string token);
    }
}
