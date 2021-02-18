using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistance.Configurations
{
    public class ProjectItemConfiguration : IEntityTypeConfiguration<ProjectItem>
    {
        public void Configure(EntityTypeBuilder<ProjectItem> builder)
        {
            builder.Property(t => t.Title)
                .HasMaxLength(50)
                .IsRequired();
        }
    }
}
