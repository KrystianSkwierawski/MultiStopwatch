using System.Text.RegularExpressions;
using System.Threading;
using System.Threading.Tasks;

namespace Project.Application.Common.Validators
{
    public static class TimeBeFormated
    {
        public static async Task<bool> BeFormated(string time, CancellationToken cancellationToken)
        {
            Regex pattern = new Regex(@"^[0-9]{2,5}:[0-9]{2}:[0-9]{2}$");

            return pattern.IsMatch(time);
        }
    }
}
