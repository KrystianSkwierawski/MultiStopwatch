using FluentValidation;

namespace Project.Application.ProjectItems.Commands.CreateProjectItem
{
    public class CreateProjectItemCommandValidator : AbstractValidator<CreateProjectItemCommand>
    {
        public CreateProjectItemCommandValidator()
        {
            RuleFor(v => v.Title)
              .MaximumLength(20)
              .NotEmpty();


            RuleFor(v => v.Theme)
              .NotNull()
              .NotEmpty();
        }
    }
}
