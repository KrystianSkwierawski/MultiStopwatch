﻿using Domain.Entities;
using Domain.Enums;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Project.Application.Common.Interfaces;
using Project.Domain.Entities;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Project.Application.AccountData.Queries.GetAccountStats
{

    public class GetAccountStatsQuery : IRequest<AccountStatsDto>
    {
        public class GetAccountStatsQueryHandler : IRequestHandler<GetAccountStatsQuery, AccountStatsDto>
        {
            private readonly IContext _context;
            private readonly ICurrentUserService _currentUserService;
            private readonly UserManager<ApplicationUser> _userManager;

            public GetAccountStatsQueryHandler(IContext context, ICurrentUserService currentUserService, UserManager<ApplicationUser> userManager)
            {
                _context = context;
                _currentUserService = currentUserService;
                _userManager = userManager;
            }

            public async Task<AccountStatsDto> Handle(GetAccountStatsQuery request, CancellationToken cancellationToken)
            {
                string userId = _currentUserService.UserId;

                IQueryable<ProjectItem> projectItems = _context.ProjectItems.AsNoTracking().Where(x => x.CreatedBy == userId);
                IQueryable<StopwatchItem> stopwatchItems = _context.StopWatchItems.AsNoTracking().Where(x => x.CreatedBy == userId);
                ApplicationUser user = await _userManager.FindByEmailAsync(userId ?? "") ?? new ApplicationUser();

                return new AccountStatsDto
                {
                    TotalTimeInSeconds = GetTotalProjectsSeconds(projectItems),
                    TotalTimeInSecondsFinished = GetTotalProjectsSeconds(projectItems.Where(x => x.Status == Status.Done)),
                    TotalTimeInSecondsNotFinished = GetTotalProjectsSeconds(projectItems.Where(x => x.Status == Status.Doing)),

                    NumberOfProjects = projectItems.Count(),
                    NumberOfFinishedProjects = projectItems.Where(x => x.Status == Status.Done).Count(),
                    NumberOfNotFinishedProjects = projectItems.Where(x => x.Status == Status.Doing).Count(),

                    NumberOfStopwatches = stopwatchItems.Count(),
                    NumberOfFinishedStopwatches = stopwatchItems.Where(x => x.Status == Status.Done).Count(),
                    NumberOfNotFinishedStopwatches = stopwatchItems.Where(x => x.Status == Status.Doing).Count(),

                    NumberOfFavoriteProjects = projectItems.Where(x => x.IsFavorite == true).Count(),

                    AccountDateCreated = user.DateCreated,
                    AccountCreatedDaysAgo = (DateTime.UtcNow - user.DateCreated).Days
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
