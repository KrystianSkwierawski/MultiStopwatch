using Infrastructure.Service;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Project.Application.Common.CustomTokenProviders;
using Project.Application.Common.Interfaces;
using Project.Application.Common.JwtFeatures;
using Project.Application.Common.Models;
using Project.Domain.Entities;
using Project.Infrastructure.Persistence;
using Project.Infrastructure.Services;
using System;

namespace Project.Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            if (configuration.GetValue<bool>("UseInMemoryDatabase"))
            {
                services.AddDbContext<Context>(options =>
                    options.UseInMemoryDatabase("ProjectDb"));
            }
            else
            {
                services.AddDbContext<Context>(options =>
                    options.UseSqlServer(
                        configuration.GetConnectionString("DefaultConnection"),
                        b => b.MigrationsAssembly(typeof(Context).Assembly.FullName)));
            }

            services.AddScoped<IContext>(provider => provider.GetService<Context>());

            services.AddTransient<IDateTime, DateTimeService>();

            //services.ConfigureApplicationCookie(options =>
            //{
            //    options.Cookie.Name = ".AspNetCore.Identity.Application";
            //    options.ExpireTimeSpan = TimeSpan.FromDays(20);
            //    options.SlidingExpiration = true;
            //});

            services.AddIdentity<ApplicationUser, IdentityRole>(opt =>
            {
                opt.Password.RequiredLength = 3;
                opt.Password.RequireDigit = false;
                opt.Password.RequireNonAlphanumeric = false;
                opt.User.RequireUniqueEmail = true;
                opt.Tokens.EmailConfirmationTokenProvider = "emailconfirmation";
            })
            .AddEntityFrameworkStores<Context>()
            .AddDefaultTokenProviders()
            .AddTokenProvider<EmailConfirmationTokenProvider<ApplicationUser>>("emailconfirmation");

            services.Configure<DataProtectionTokenProviderOptions>(opt =>
              opt.TokenLifespan = TimeSpan.FromHours(2));

            services.Configure<EmailConfirmationTokenProviderOptions>(opt =>
                opt.TokenLifespan = TimeSpan.FromDays(2));

             var emailConfig = configuration
                .GetSection("EmailConfiguration")
                .Get<EmailConfiguration>();
            services.AddSingleton(emailConfig);
            services.AddScoped<IEmailSender, EmailSender>();

            services.AddScoped<JwtHandler>();

            services.AddSignalR();

            return services;
        }
    }
}
