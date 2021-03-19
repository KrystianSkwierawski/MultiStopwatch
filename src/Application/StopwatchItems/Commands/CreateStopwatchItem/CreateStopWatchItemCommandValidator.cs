using FluentValidation;
using System.Text.RegularExpressions;
using System.Threading;
using System.Threading.Tasks;

namespace Project.Application.StopwatchItems.Commands.CreateStopwatchItem
{
    public class CreateStopwatchItemCommandValidator : AbstractValidator<CreateStopwatchItemCommand>
    {
        public CreateStopwatchItemCommandValidator()
        {
            RuleFor(v => v.Title)
                .MaximumLength(20)
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
