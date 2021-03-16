using FluentValidation;

namespace Project.Application.FavoriteProjectItems.Commands.UpdateOrderIndex
{
    public class UpdateOrderIndexProjectItemCommandValidator : AbstractValidator<UpdateOrderIndexProjectItemCommand>
    {
        public UpdateOrderIndexProjectItemCommandValidator()
        {
            RuleFor(x => x.CurrentProjects)
                .NotEmpty()
                .NotNull();
        }
    }
}
