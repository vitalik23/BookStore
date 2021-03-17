using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Store.DataAccessLayer.Entities;
using Store.DataAccessLayer.Initialization;

namespace Store.DataAccessLayer.AppContext
{
    public class ApplicationContext : IdentityDbContext<User>
    {
        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {
            Database.Migrate();
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {



            builder.Entity<PrintingEdition>()
                .Property(property => property.SubSubTitle)
                .HasDefaultValue("Empty")
                .IsRequired();

            builder.Entity<AuthorInPrintingEdition>()
                .HasKey(authorInPrinting => new
                {
                    authorInPrinting.AuthorId,
                    authorInPrinting.PrintingEditionId
                });

            builder.Entity<AuthorInPrintingEdition>(b =>
            {
                b.HasOne(authorInPrinting => authorInPrinting.Author)
                .WithMany(author => author.AuthorInPrintingEdition)
                .HasForeignKey(authorInPrinting => authorInPrinting.AuthorId);

                b.HasOne(authorInPrinting => authorInPrinting.PrintingEdition)
                .WithMany(printingEdition => printingEdition.AuthorInPrintingEdition)
                .HasForeignKey(authorInPrinting => authorInPrinting.PrintingEditionId);
            });

            DataBaseInitialization.InitializeDBAuthorAndPrintingEdition(builder);

            base.OnModelCreating(builder);
        }

        public DbSet<Author> Authors { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<PrintingEdition> PrintingEditions { get; set; }
        public DbSet<AuthorInPrintingEdition> AuthorInPrintingEditions { get; set; }

    }

}
