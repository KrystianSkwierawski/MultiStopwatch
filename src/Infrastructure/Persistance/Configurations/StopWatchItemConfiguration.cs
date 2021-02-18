using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistance.Configurations
{
    public class StopWatchItemConfiguration : IEntityTypeConfiguration<StopWatchItem>
    {
        public void Configure(EntityTypeBuilder<StopWatchItem> builder)
        {
            builder.Property(t => t.Title)
                .HasMaxLength(50)
                .IsRequired();
        }
    }
}
