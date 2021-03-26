using FluentValidation;
using Project.Application.Common.Validators;

namespace Project.Application.SplittedTimes.Commands.CreateSplittedTime
{
    using static TimeBeFormated;
    public class CreateSplittedTimeCommandValidator : AbstractValidator<CreateSplittedTimeCommand>
    {
        public CreateSplittedTimeCommandValidator()
        {
            RuleFor(v => v.Time)
                .NotEmpty()
                .NotNull()
                .MustAsync(BeFormated);
        }     
    }
}
