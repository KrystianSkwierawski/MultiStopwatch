using FluentValidation;
using Project.Application.Common.Validators;

namespace Project.Application.StopwatchItems.Commands.CreateStopwatchItem
{
    using static TimeBeFormated;
    public class CreateStopwatchItemCommandValidator : AbstractValidator<CreateStopwatchItemCommand>
    {
        public CreateStopwatchItemCommandValidator()
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
