using FluentValidation;

namespace Project.Application.StopwatchItems.Queries.GetStopwatchItemsWithPagination
{
    public class GetStopwatchItemsWithPaginationQueryValidator : AbstractValidator<GetStopwatchItemsWithPaginationQuery>
    {
        public GetStopwatchItemsWithPaginationQueryValidator()
        {
            RuleFor(x => x.PageNumber)
             .GreaterThanOrEqualTo(1).WithMessage("PageNumber at least greater than or equal to 1.");

            RuleFor(x => x.PageSize)
                .GreaterThanOrEqualTo(1).WithMessage("PageSize at least greater than or equal to 1.");
        }
    }
}
