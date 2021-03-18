using FluentValidation;

namespace Project.Application.StopwatchItems.Commands.UpdateStopwatchItem
{
    public class UpdateStopwatchItemCommandValidator : AbstractValidator<UpdateStopwatchItemCommand>
    {
        public UpdateStopwatchItemCommandValidator()
        {
            RuleFor(v => v.Title)
                .MaximumLength(20)
                .NotEmpty();

            RuleFor(v => v.Time)
                .NotEmpty()
                .NotNull();
        }
    }
}
