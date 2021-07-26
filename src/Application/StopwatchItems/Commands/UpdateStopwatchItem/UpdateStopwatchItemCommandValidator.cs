using Domain.Enums;
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
