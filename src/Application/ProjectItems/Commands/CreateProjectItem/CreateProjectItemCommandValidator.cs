using FluentValidation;

namespace Project.Application.ProjectItems.Commands.CreateProjectItem
{
    public class CreateProjectItemCommandValidator : AbstractValidator<CreateProjectItemCommand>
    {
        public CreateProjectItemCommandValidator()
        {
            RuleFor(v => v.Title)
             .MaximumLength(20).WithMessage("Title must not exceed 20 characters.")
             .NotNull().WithMessage("Title is required.")
             .NotEmpty().WithMessage("Title is required.");

            RuleFor(v => v.Theme)
             .NotNull().WithMessage("Theme is required.")
             .NotEmpty().WithMessage("Theme is required.");
        }
    }
}
