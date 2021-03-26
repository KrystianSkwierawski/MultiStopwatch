using FluentValidation;
using Project.Application.Common.Validators;

namespace Project.Application.StopwatchItems.Commands.UpdateStopwatchItem
{
    using static TimeBeFormated;
    public class UpdateStopwatchItemCommandValidator : AbstractValidator<UpdateStopwatchItemCommand>
    {
        public UpdateStopwatchItemCommandValidator()
        {
            RuleFor(v => v.Title)
                .MaximumLength(20)
                .NotEmpty();

            RuleFor(v => v.Theme)
             .NotNull()
             .NotEmpty();

            RuleFor(v => v.Time)
                .NotEmpty()
                .NotNull()
                .MustAsync(BeFormated);
        }
    }
}
