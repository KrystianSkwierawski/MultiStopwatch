using System;

namespace Project.Application.AccountData.Queries.GetAccountStats
{
    public class AccountStatsDto
    {
        public int TotalTimeInSeconds { get; set; }
        public int TotalTimeInSecondsFinished { get; set; }
        public int TotalTimeInSecondsNotFinished { get; set; }

        public int NumberOfProjects { get; set; }
        public int NumberOfFinishedProjects { get; set; }
        public int NumberOfNotFinishedProjects { get; set; }

        public int NumberOfStopwatches { get; set; }
        public int NumberOfFinishedStopwatches { get; set; }
        public int NumberOfNotFinishedStopwatches { get; set; }

        public int NumberOfFavoriteProjects { get; set; }

        public DateTime AccountDateCreated { get; set; }
        public int AccountCreatedDaysAgo { get; set; }
    }
}