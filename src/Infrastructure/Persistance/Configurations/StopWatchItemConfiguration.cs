using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistance.Configurations
{
    public class StopWatchItemConfiguration : IEntityTypeConfiguration<StopwatchItem>
    {
        public void Configure(EntityTypeBuilder<StopwatchItem> builder)
        {
            builder.Property(t => t.Title)
                .HasMaxLength(20)
                .IsRequired();
        }
    }
}
