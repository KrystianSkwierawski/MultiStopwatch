namespace Project.Application.AccountsStats.Queries.GetAccountStats
{
    public class AccountStatsDto
    {
        public int TotalTimeInSeconds { get; set; }

        public int TotalTimeInSecondsFinished { get; set; }

        public int TotalTimeInSecondsNotFinished { get; set; }

        public int TotalNumberOfProjects { get; set; }
        public int TotalNumberOfFinishedProjects { get; set; }
        public int TotalNumberOfNotFinishedProjects { get; set; }

        public int TotalNumberOfStopwatches { get; set; }
        public int TotalNumberOfFinishedStopwatches { get; set; }
        public int TotalNumberOfNotFinishedStopwatches { get; set; }

    }
}
