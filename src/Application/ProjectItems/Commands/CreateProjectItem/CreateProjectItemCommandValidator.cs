using FluentValidation;

namespace Project.Application.ProjectItems.Commands.CreateProjectItem
{
    public class CreateStopWatchItemCommandValidator : AbstractValidator<CreateProjectItemCommand>
    {
        public CreateStopWatchItemCommandValidator()
        {
            RuleFor(v => v.Title)
              .MaximumLength(20)
              .NotEmpty();
        }
    }
}
