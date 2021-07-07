using FluentValidation;
using Project.Application.Common.Validators;

namespace Project.Application.StopwatchItems.Commands.CreateStopwatchItem
{
    using static TimeBeFormated;
    public class CreateStopwatchItemCommandValidator : AbstractValidator<CreateStopwatchItemCommand>
    {
        public CreateStopwatchItemCommandValidator()
        {
            RuleFor(x => x.ProjectItemId)
               .NotNull()
               .NotEmpty().WithMessage("ProjectItemId is required.");

            RuleFor(v => v.Title)
                .MaximumLength(20).WithMessage("Title must not exceed 20 characters.")
                .NotNull().WithMessage("Title is required.")
                .NotEmpty().WithMessage("Title is required.");

            RuleFor(v => v.Theme)
             .NotNull().WithMessage("Theme is required.")
             .NotEmpty().WithMessage("Theme is required.");

            RuleFor(v => v.Time)
                .NotEmpty().WithMessage("Time is required.")
                .NotNull().WithMessage("Time is required.")
                .MustAsync(BeFormated).WithMessage("Time must be formated \"00:00:00\".");
        }
    }
}
