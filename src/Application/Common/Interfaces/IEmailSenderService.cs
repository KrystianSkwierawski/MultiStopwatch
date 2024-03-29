﻿using Project.Application.Common.Models;
using System.Threading.Tasks;

namespace Project.Application.Common.Interfaces
{
    public interface IEmailSenderService
    {
        void SendEmail(Message message);
        Task SendEmailAsync(Message message);
    }
}
