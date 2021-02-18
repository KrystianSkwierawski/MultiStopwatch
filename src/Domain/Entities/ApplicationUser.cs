using Domain.Entities;
using Microsoft.AspNetCore.Identity;

namespace Project.Domain.Entities
{
    public class ApplicationUser : IdentityUser
    {
        public ProjectItem ProjectItems { get; set; }
    }
}
