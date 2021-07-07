using FluentValidation;
using Project.Application.Common.Validators;

namespace Project.Application.SplittedTimes.Commands.CreateSplittedTime
{
    using static TimeBeFormated;
    public class CreateSplittedTimeCommandValidator : AbstractValidator<CreateSplittedTimeCommand>
    {
        public CreateSplittedTimeCommandValidator()
        {
            RuleFor(x => x.StopwatchItemId)
                .NotNull()
                .NotEmpty().WithMessage("StopwatchItemId is required.");

            RuleFor(v => v.Time)
                .NotEmpty().WithMessage("Time is required.")
                .NotNull().WithMessage("Time is required.")
                .MustAsync(BeFormated).WithMessage("Time must be formated \"00:00:00\".");
        }     
    }
}
