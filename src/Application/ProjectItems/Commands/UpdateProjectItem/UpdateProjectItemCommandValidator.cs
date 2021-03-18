using FluentValidation;

namespace Project.Application.ProjectItems.Commands.UpdateProjectItem
{
    public class UpdateProjectItemCommandValidator : AbstractValidator<UpdateProjectItemCommand>
    {
        public UpdateProjectItemCommandValidator()
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
