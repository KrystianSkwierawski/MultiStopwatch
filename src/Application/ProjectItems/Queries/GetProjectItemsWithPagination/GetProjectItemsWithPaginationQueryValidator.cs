using FluentValidation;

namespace Project.Application.ProjectItems.Queries.GetProjectItemsWithPagination
{
    public class GetProjectItemsWithPaginationQueryValidator : AbstractValidator<GetProjectItemsWithPaginationQuery>
    {
        public GetProjectItemsWithPaginationQueryValidator()
        {
            RuleFor(x => x.PageNumber)
             .GreaterThanOrEqualTo(1).WithMessage("PageNumber at least greater than or equal to 1.");

            RuleFor(x => x.PageSize)
                .GreaterThanOrEqualTo(1).WithMessage("PageSize at least greater than or equal to 1.");
        }
    }
}
