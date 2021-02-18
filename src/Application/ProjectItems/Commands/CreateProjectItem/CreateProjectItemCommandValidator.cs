using FluentValidation;

namespace Project.Application.ProjectItems.Commands.CreateProjectItem
{
    public class CreateProjectItemCommandValidator : AbstractValidator<CreateProjectItemCommand>
    {
        public CreateProjectItemCommandValidator()
        {
            RuleFor(v => v.Title)
              .MaximumLength(50)
              .NotEmpty();
        }
    }
}
