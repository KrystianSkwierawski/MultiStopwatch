using Project.Application.Common.Interfaces;
using System;

namespace Project.Infrastructure.Services
{
    public class DateTimeService : IDateTime
    {
        public DateTime Now => DateTime.UtcNow;
    }
}
