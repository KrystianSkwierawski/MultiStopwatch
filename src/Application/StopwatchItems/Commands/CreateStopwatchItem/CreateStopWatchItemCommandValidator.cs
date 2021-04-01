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
                .MaximumLength(20).WithMessage("Title must not exceed 20 characters.")
                .NotNull().WithMessage("Title is required.")
                .NotEmpty().WithMessage("Title is required.");

            RuleFor(v => v.Theme)
             .NotNull().WithMessage("Title is required.")
             .NotEmpty().WithMessage("Title is required.");

            RuleFor(v => v.Time)
                .NotEmpty().WithMessage("Title is required.")
                .NotNull().WithMessage("Title is required.")
                .MustAsync(BeFormated).WithMessage("Title must be formated \"00:00:00\".");
        }
    }
}
