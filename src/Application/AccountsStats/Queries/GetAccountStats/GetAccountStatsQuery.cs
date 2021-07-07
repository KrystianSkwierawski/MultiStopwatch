using Domain.Entities;
using MediatR;
using Project.Application.Common.Interfaces;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Project.Application.AccountsStats.Queries.GetAccountStats
{

    public class GetAccountStatsQuery : IRequest<AccountStatsDto>
    {
        public class GetAccountStatsQueryHandler : IRequestHandler<GetAccountStatsQuery, AccountStatsDto>
        {
            private readonly IContext _context;
            private readonly ICurrentUserService _currentUserService;

            public GetAccountStatsQueryHandler(IContext context, ICurrentUserService currentUserService)
            {
                _context = context;
                _currentUserService = currentUserService;
            }

            public async Task<AccountStatsDto> Handle(GetAccountStatsQuery request, CancellationToken cancellationToken)
            {
                string userEmail = _currentUserService.UserEmail;

                IQueryable<ProjectItem> projectItems = _context.ProjectItems.Where(x => x.CreatedBy == userEmail);

                return new AccountStatsDto
                {
                    TotalNumberOfProjects = projectItems.Count(),
                    TotalNumberOfStopwatches = _context.StopWatchItems.Where(x => x.CreatedBy == userEmail).Count(),
                    TotalTimeInSeconds = GetTotalProjectsSeconds(projectItems)
                };
            }

            private int GetTotalProjectsSeconds(IQueryable<ProjectItem> projectItems)
            {
                int o_totalSeconds = 0;

                foreach (var projectItem in projectItems)
                {
                    string[] timeArray = projectItem.Time.Split(":");

                    int hours = Int32.Parse(timeArray[0]);
                    o_totalSeconds += hours * 3600;

                    int minutes = Int32.Parse(timeArray[1]);
                    o_totalSeconds += minutes * 60;

                    int seconds = Int32.Parse(timeArray[2]);
                    o_totalSeconds += seconds;
                }

                return o_totalSeconds;
            }
        }
    }

}
