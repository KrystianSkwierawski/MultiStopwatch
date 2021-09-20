using Newtonsoft.Json.Linq;
using Project.Application.Interfaces;
using System.Net.Http;
using System.Threading.Tasks;

namespace Project.Infrastructure.Services
{
    public class FacebookAuthCheckerService : IFacebookAuthCheckerService
    {
        public async Task<JObject> GetFacebookAuthCheck(string token)
        {
            using HttpClient client = new();

            string url = "https://graph.facebook.com/me?access_token=" + token;
            using HttpResponseMessage res = await client.GetAsync(url);

            using HttpContent content = res.Content;

            string data = await content.ReadAsStringAsync();
            JObject dataObj = JObject.Parse(data);

            return dataObj;
        }
    }
}
