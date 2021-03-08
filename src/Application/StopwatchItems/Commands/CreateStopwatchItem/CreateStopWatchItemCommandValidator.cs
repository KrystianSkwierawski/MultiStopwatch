using FluentValidation;

namespace Project.Application.StopwatchItems.Commands.CreateStopwatchItem
{
    public class CreateStopwatchItemCommandValidator : AbstractValidator<CreateStopwatchItemCommand>
    {
        public CreateStopwatchItemCommandValidator()
        {
            RuleFor(v => v.Title)
              .MaximumLength(20)
              .NotEmpty();
        }
    }
}
