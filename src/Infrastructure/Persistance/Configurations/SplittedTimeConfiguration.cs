using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistance.Configurations
{
    public class SplittedTimeConfiguration : IEntityTypeConfiguration<SplittedTime>
    {
        public void Configure(EntityTypeBuilder<SplittedTime> builder)
        {
            builder.Property(t => t.Time)
                .IsRequired();
        }
    }
}
