﻿using FluentValidation;
using Project.Application.Common.Validators;

namespace Project.Application.ProjectItems.Commands.UpdateProjectItem
{
    using static TimeBeFormated;
    public class UpdateProjectItemCommandValidator : AbstractValidator<UpdateProjectItemCommand>
    {      
        public UpdateProjectItemCommandValidator()
        {
            RuleFor(v => v.Title)
                .MaximumLength(20)
                .NotEmpty();

            RuleFor(v => v.Theme)
             .NotNull()
             .NotEmpty();

            RuleFor(v => v.Time)
                 .NotEmpty()
                 .NotNull()
                 .MustAsync(BeFormated);
        }
    }
}
