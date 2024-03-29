﻿using Microsoft.AspNetCore.Identity;
using System;

namespace Project.Domain.Entities
{
    public class ApplicationUser : IdentityUser
    {
        public DateTime DateCreated { get; set; } = DateTime.UtcNow;
        public bool HasPassword { get; set; }
    }
}
