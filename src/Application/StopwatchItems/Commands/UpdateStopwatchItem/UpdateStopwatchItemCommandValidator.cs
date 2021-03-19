using FluentValidation;
using System.Text.RegularExpressions;
using System.Threading;
using System.Threading.Tasks;

namespace Project.Application.StopwatchItems.Commands.UpdateStopwatchItem
{
    public class UpdateStopwatchItemCommandValidator : AbstractValidator<UpdateStopwatchItemCommand>
    {
        public UpdateStopwatchItemCommandValidator()
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

        public async Task<bool> BeFormated(string time, CancellationToken cancellationToken)
        {
            Regex pattern = new Regex(@"^[0-9]{2,5}:[0-9]{2}:[0-9]{2}$");

            return pattern.IsMatch(time);
        }
    }
}
